import Mailgun from 'mailgun.js';
import { IMailRepo, Mail } from '../data';
import { MAILGUN_DOMAIN, MAILGUN_HOSTING, MAILGUN_ID } from '../env';

export const USBaseURL = 'https://api.mailgun.net/';

export const EUBaseURL = 'https://api.eu.mailgun.net/';

export interface IMailgunSvc {
    send: (
        from: string,
        to: string[] | string,
        subject: string,
        html: string
    ) => Promise<Mail | null>;
}

export const MailgunSvc = (mailRepo: IMailRepo, mailGunInstance: Mailgun) => {
    const send = async (from: string, to: string[] | string, subject: string, html: string) => {
        const mail = await mailRepo.create({
            from,
            to: Array.isArray(to) ? to.join(',') : to,
            subject,
            body: html,
            service: 'Mailgun',
            status: 'Pending'
        });

        if (!mail) {
            throw new Error('Failed to create Mail Object');
        }

        try {
            const mg = mailGunInstance.client({
                username: 'api',
                key: MAILGUN_ID as string,
                url: MAILGUN_HOSTING === 'US' ? USBaseURL : EUBaseURL
            });

            await mg.messages.create(MAILGUN_DOMAIN as string, {
                to: Array.isArray(to) ? to : [to],
                from,
                subject,
                html
            });

            return await mailRepo
                .findByIdAndUpdate(mail._id, {
                    $set: {
                        status: 'Sent'
                    }
                })
                .lean();
        } catch (e) {
            return await mailRepo
                .findByIdAndUpdate(mail._id, {
                    $set: {
                        status: 'Error'
                    }
                })
                .lean();
        }
    };

    return {
        send
    };
};
