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

// Automatically remove dev-mode migration marker and register migrations as completed
if (process.env.DATABASE_URI) {
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URI,
  })
  try {
    await client.connect()
    // Check if the dev marker exists
    const devCheck = await client.query("SELECT id FROM payload_migrations WHERE batch = -1 LIMIT 1;")
    if (devCheck.rows.length > 0) {
      // Remove the dev marker
      await client.query("DELETE FROM payload_migrations WHERE batch = -1;")
      // Mark both migrations as already completed so Payload doesn't re-run them
      await client.query(`
        INSERT INTO payload_migrations (id, name, batch, created_at, updated_at)
        VALUES
          (gen_random_uuid(), '20260618_034158_init_schema', 1, now(), now()),
          (gen_random_uuid(), '20260707_120000_add_cloudinary_public_ids', 2, now(), now())
        ON CONFLICT DO NOTHING;
      `)
      console.log("Cleared dev migration marker and registered migrations as completed.")
    }
    await client.end()
  } catch (err) {
    console.error("Error clearing dev migration marker:", err)
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
