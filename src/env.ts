import { config } from 'dotenv';
config();

if (!process.env.JWT_SECRET)
    throw new Error(`Missing environment variable JWT_SECRET!`)
export const JWT_SECRET = process.env.JWT_SECRET