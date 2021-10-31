import { NextFunction, Request, Response } from 'express';
import { SERVICE_PROVIDER_DOMAINS } from './enviornment';

export const bouncer = (req: Request, res: Response, next: NextFunction) => {
    if (SERVICE_PROVIDER_DOMAINS) {
        const verifiedDomains = SERVICE_PROVIDER_DOMAINS.split(',');
        console.log(
            req.header('Origin'),
            req.get('host'),
            req.get('origin'),
            req.headers.host,
            req.headers.origin
        );
        const originUrl =
            req.header('Origin') ||
            req.get('host') ||
            req.get('origin') ||
            req.headers.host ||
            req.headers.origin;
        for (let i = 0; i < verifiedDomains.length; i++) {
            if (
                verifiedDomains[i] === originUrl ||
                verifiedDomains[i].includes(originUrl as string)
            ) {
                next();
                return;
            }
        }
        console.error('Locked to specific Service Provider', originUrl);
        res.status(401).end('Locked to specific Service Provider');
    } else {
        next();
    }
};
