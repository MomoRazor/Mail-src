import { config } from 'dotenv';
config();

if (!process.env.MONGO_URL)
	throw new Error(`Missing environment variable MONGO_URL!`)

export const MONGO_URL = process.env.MONGO_URL

if (!process.env.JWT_SECRET)
    throw new Error(`Missing environment variable JWT_SECRET!`)
export const JWT_SECRET = process.env.JWT_SECRET

if (!process.env.PORT) throw new Error(`Missing environment variable PORT!`)

export const PORT = process.env.PORT