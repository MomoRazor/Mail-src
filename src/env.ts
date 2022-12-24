import { config } from 'dotenv';
config();

if (!process.env.MONGO_URL) throw new Error(`Missing environment variable MONGO_URL!`);

export const MONGO_URL = process.env.MONGO_URL;

if (!process.env.JWT_SECRET) throw new Error(`Missing environment variable JWT_SECRET!`);
export const JWT_SECRET = process.env.JWT_SECRET;

if (!process.env.PORT) throw new Error(`Missing environment variable PORT!`);

export const PORT = process.env.PORT;

if (!process.env.USES) throw new Error(`Missing environment variable USES!`);

export const USES = process.env.USES;

export const supportedServices = ['Mailgun'];

if (!supportedServices.includes(USES))
    throw new Error('Service defined in USES environment variable is unsupported');

if (USES === 'Mailgun') {
    if (!process.env.MAILGUN_ID) throw new Error(`Missing environment variable MAILGUN_ID!`);
    if (!process.env.MAILGUN_DOMAIN)
        throw new Error(`Missing environment variable MAILGUN_DOMAIN!`);
}

export const MAILGUN_ID = process.env.MAILGUN_ID;
export const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
