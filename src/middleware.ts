import { NextFunction, Request, Response } from 'express';
import { SERVICE_PROVIDER_DOMAINS } from './enviornment';

export const bouncer = (req: Request, res: Response, next: NextFunction) => {
    if (SERVICE_PROVIDER_DOMAINS) {
        const verifiedDomains = SERVICE_PROVIDER_DOMAINS.split(',');
        const originUrl = req.header('Origin') || req.get('host') || req.hostname;
        for (let i = 0; i < verifiedDomains.length; i++) {
            if (verifiedDomains[i] === originUrl || verifiedDomains[i].includes(originUrl)) {
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
