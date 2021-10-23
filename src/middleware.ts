import { NextFunction, Request, Response } from 'express';
import { SERVICE_PROVIDER_DOMAIN } from './enviornment';

export const bouncer = (req: Request, res: Response, next: NextFunction) => {
    if (!SERVICE_PROVIDER_DOMAIN || req.hostname === SERVICE_PROVIDER_DOMAIN) {
        next();
    } else {
        res.status(401).end('Locked to specific Service Provider');
    }
};
