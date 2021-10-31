import { NextFunction, Request, Response } from 'express';
import { SERVICE_PROVIDER_DOMAINS } from './enviornment';

export const bouncer = (req: Request, res: Response, next: NextFunction) => {
    if (SERVICE_PROVIDER_DOMAINS) {
        const verifiedDomains = SERVICE_PROVIDER_DOMAINS.split(',');
        if (verifiedDomains.includes(req.headers.referer || '')) {
            next();
        } else {
            console.error('Locked to specific Service Provider', req.headers.referer);
            res.status(401).end('Locked to specific Service Provider');
        }
    } else {
        next();
    }
};
