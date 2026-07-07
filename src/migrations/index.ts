import * as migration_20260618_034158_init_schema from './20260618_034158_init_schema';
import * as migration_20260707_120000_add_cloudinary_public_ids from './20260707_120000_add_cloudinary_public_ids';

export const migrations = [
  {
    up: migration_20260618_034158_init_schema.up,
    down: migration_20260618_034158_init_schema.down,
    name: '20260618_034158_init_schema'
  },
  {
    up: migration_20260707_120000_add_cloudinary_public_ids.up,
    down: migration_20260707_120000_add_cloudinary_public_ids.down,
    name: '20260707_120000_add_cloudinary_public_ids'
  },
];
