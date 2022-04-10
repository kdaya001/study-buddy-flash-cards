import pg from 'pg';
import { DATABASE_URL } from '../config/server';

export const db =
  process.env.NODE_ENV === 'production'
    ? new pg.Pool({
        connectionString: DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      })
    : new pg.Pool({ connectionString: DATABASE_URL });
