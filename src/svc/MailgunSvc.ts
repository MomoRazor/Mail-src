import Mailgun from "mailgun.js";
import { IMailRepo, Mail } from "../data";

export const USBaseURL = 'https://api.mailgun.net/';

export const EUBaseURL = 'https://api.eu.mailgun.net/';

export enum Hosted {
    US = 'US',
    EU = 'EU'
}

export interface IMailgunSvc {
	send: (mailgunId: string,
        mailgunDomain: string,
        from: string,
        to: string[] | string,
        subject: string,
        html: string,
        hosted?: Hosted) => Promise<Mail | null>
}

export const MailgunSvc = (mailRepo: IMailRepo, mailGunInstance: Mailgun) => {
    const send = async (
        mailgunId: string,
        mailgunDomain: string,
        from: string,
        to: string[] | string,
        subject: string,
        html: string,
        hosted?: Hosted
    ) => {

        const mail = await mailRepo.create({
            from,
            to: Array.isArray(to) ? to.join(',') : to,
            subject,
            body: html,
            service: 'Mailgun',
            status: 'Pending'
        })

        if(!mail){
            throw new Error('Failed to create Mail Object')
        }

        try{
            const mg = mailGunInstance.client({
                username: 'api',
                key: mailgunId,
                url: hosted === Hosted.US ? USBaseURL : EUBaseURL
            });
        
            await mg.messages.create(mailgunDomain, {
                to: Array.isArray(to) ? to : [to],
                from,
                subject,
                html
            });

            return await mailRepo.findByIdAndUpdate(mail._id, {
                $set: {
                    status: 'Sent'
                }
            }).lean()

        }catch(e){
            
            return await mailRepo.findByIdAndUpdate(mail._id, {
                $set: {
                    status: 'Error'
                }
            }).lean()
        }
    };

    return {
        send
    }
}