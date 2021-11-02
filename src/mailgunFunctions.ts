import Mailgun from 'mailgun.js';
import formData from 'form-data';

const getEmailClient = (api: string) => {
    const mailgun = new Mailgun(formData);

    return mailgun.client({
        username: 'api',
        key: 'key-' + api
    });
};

export const sendEmail = async (
    mailgunId: string,
    mailgunDomain: string,
    from: string,
    to: string[],
    subject: string,
    html: string
) => {
    const client = getEmailClient(mailgunId);

    return await client.messages.create(mailgunDomain, {
        from: from,
        to: to,
        subject: subject,
        html: html
    });
};
