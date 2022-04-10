import dotenv from 'dotenv';

// read config from `.env` file
dotenv.config();

export const PORT = process.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
