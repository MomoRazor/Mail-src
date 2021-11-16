import { EUBaseURL, Hosted, USBaseURL } from './config';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(FormData);

export const sendEmail = async (
    mailgunId: string,
    mailgunDomain: string,
    from: string,
    to: string[] | string,
    subject: string,
    html: string,
    hosted?: Hosted
) => {
    const mg = mailgun.client({
        username: 'api',
        key: mailgunId,
        url: hosted === Hosted.US ? USBaseURL : EUBaseURL
    });

    mg.messages.create(mailgunDomain, {
        to: Array.isArray(to) ? to : [to],
        from,
        subject,
        html
    });
};
