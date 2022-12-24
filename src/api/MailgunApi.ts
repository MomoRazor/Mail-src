import { Application } from 'express';
import { IMailgunSvc } from '../svc';

export const MailgunApi = (app: Application, mailGunSvc: IMailgunSvc, prefix: string) => {
    app.post(`${prefix}/mailgun/send`, async (req, res) => {
        try {
            const { body } = req;

            const newMail = await mailGunSvc.send(body.from, body.to, body.subject, body.html);

            return res.status(200).json({
                data: newMail,
                errors: []
            });
        } catch (e: any) {
            console.error(e);
            return res.status(500).json({
                data: null,
                errors: [e.message]
            });
        }
    });
};
