import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { cloudinaryAdapter } from './src/lib/cloudinaryAdapter'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import path from 'path'
import pg from 'pg'

import { Users } from './src/collections/Users'
import { Products } from './src/collections/Products'
import { Categories } from './src/collections/Categories'
import { Media } from './src/collections/Media'
import { Orders } from './src/collections/Orders'
import { Inquiries } from './src/collections/Inquiries'
import { migrations } from './src/migrations'

// Ensure migration records exist and correct columns are present in the database
if (process.env.DATABASE_URI) {
  const isLocal = process.env.DATABASE_URI.includes('127.0.0.1') || process.env.DATABASE_URI.includes('localhost')
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URI,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  })
  try {
    await client.connect()
    // Remove any dev-mode marker
    await client.query("DELETE FROM payload_migrations WHERE batch = -1;")
    // Ensure both migrations are registered as completed (skip if already present)
    const existing = await client.query("SELECT name FROM payload_migrations WHERE name IN ('20260618_034158_init_schema', '20260707_120000_add_cloudinary_public_ids');")
    const existingNames = existing.rows.map((r: { name: string }) => r.name)
    if (!existingNames.includes('20260618_034158_init_schema')) {
      await client.query("INSERT INTO payload_migrations (id, name, batch, created_at, updated_at) VALUES (gen_random_uuid(), '20260618_034158_init_schema', 1, now(), now());")
    }
    if (!existingNames.includes('20260707_120000_add_cloudinary_public_ids')) {
      await client.query("INSERT INTO payload_migrations (id, name, batch, created_at, updated_at) VALUES (gen_random_uuid(), '20260707_120000_add_cloudinary_public_ids', 2, now(), now());")
    }

    // Direct schema fix to ensure media and products tables have correct columns on production database
    await client.query(`
      ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "cloudinary_public_id" varchar;
      ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_cloudinary_public_id" varchar;
      ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_cloudinary_public_id" varchar;
      ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_hero_cloudinary_public_id" varchar;
      ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "card_weight_label" varchar;
      ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "ingredients" jsonb;
      ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "how_to_use" jsonb;
      ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "shipping_and_delivery" jsonb;
      ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "return_and_refunds" jsonb;
    `)

    await client.end()
    console.log("Migration records and media columns verified successfully.")
  } catch (err) {
    console.error("Error verifying migration records or altering schema:", err)
  }
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname, 'src'),
    },
  },
  collections: [Users, Products, Categories, Media, Orders, Inquiries],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-local-dev',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://postgres:postgres@127.0.0.1:5432/goni',
    },
    push: false,
    idType: 'uuid',
    prodMigrations: migrations,
  }),
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter({
            folder: 'goni-media',
          }),
          disablePayloadAccessControl: true,
        },
      },
    }),
  ],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
