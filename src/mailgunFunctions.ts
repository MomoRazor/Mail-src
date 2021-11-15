import { EUBaseURL, Hosted, USBaseURL } from './config';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';

export const sendEmail = async (
    mailgunId: string,
    mailgunDomain: string,
    from: string,
    to: string[] | string,
    subject: string,
    html: string,
    hosted?: Hosted
) => {
    const mailgun = new Mailgun(FormData);

    const mg = mailgun.client({
        username: 'api',
        key: mailgunId,
        url: hosted === Hosted.EU ? EUBaseURL : USBaseURL
    });

    mg.messages.create(mailgunDomain, {
        to,
        from,
        subject,
        html
    });
};
