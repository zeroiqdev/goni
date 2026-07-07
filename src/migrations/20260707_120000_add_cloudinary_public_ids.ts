import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "cloudinary_public_id" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_cloudinary_public_id" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_cloudinary_public_id" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_hero_cloudinary_public_id" varchar;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" DROP COLUMN IF EXISTS "cloudinary_public_id";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_cloudinary_public_id";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_cloudinary_public_id";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_cloudinary_public_id";
  `)
}
