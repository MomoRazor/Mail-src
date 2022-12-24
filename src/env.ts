import { config } from 'dotenv';
config();

if (!process.env.MONGO_URL) throw new Error(`Missing environment variable MONGO_URL!`);

export const MONGO_URL = process.env.MONGO_URL;

if (!process.env.RBAC_SECRET && !process.env.API_KEY)
    throw new Error(`Missing both RBAC_SECRET and APIK_KEY environment variables!`);

export const RBAC_SECRET = process.env.RBAC_SECRET;
export const API_KEY = process.env.API_KEY;

if (!process.env.PORT) throw new Error(`Missing environment variable PORT!`);

export const PORT = process.env.PORT;

if (!process.env.USES) throw new Error(`Missing environment variable USES!`);

export const USES = process.env.USES;

export const supportedServices = ['Mailgun', 'Mailjet'];

if (!supportedServices.includes(USES))
    throw new Error(
        `Environment variable USES must be one of the following: ${supportedServices.join(',')}!`
    );

if (USES === 'Mailgun') {
    if (!process.env.MAILGUN_ID) throw new Error(`Missing environment variable MAILGUN_ID!`);
    if (!process.env.MAILGUN_DOMAIN)
        throw new Error(`Missing environment variable MAILGUN_DOMAIN!`);

    if (!process.env.MAILGUN_HOSTING)
        throw new Error(`Missing environment variable MAILGUN_HOSTING!`);

    const supportedMailgunHostingOptions = ['EU', 'US'];

    if (!supportedMailgunHostingOptions.includes(process.env.MAILGUN_HOSTING))
        throw new Error(
            `Environment variable MAILGUN_HOSTING must be one of the following: ${supportedMailgunHostingOptions.join(
                ','
            )}!`
        );
} else if (USES === 'Mailjet') {
    if (!process.env.MAILJET_KEY) throw new Error(`Missing environment variable MAILJET_KEY!`);

    if (!process.env.MAILJET_SECRET)
        throw new Error(`Missing environment variable MAILJET_SECRET!`);
}

export const MAILJET_KEY = process.env.MAILJET_KEY;
export const MAILJET_SECRET = process.env.MAILJET_SECRET;

export const MAILGUN_ID = process.env.MAILGUN_ID;
export const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
export const MAILGUN_HOSTING = process.env.MAILGUN_HOSTING;
