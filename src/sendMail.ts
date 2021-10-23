import mailgunJS from 'mailgun-js';

const getEmailClient = (api: string, domain: string) => {
    return mailgunJS({
        apiKey: api,
        domain: domain
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
    const client = getEmailClient(mailgunId, mailgunDomain);

    return await client.messages().send(
        {
            from: from,
            to: to,
            subject: subject,
            html: html
        },
        (err: any, body: any) => {
            if (err) {
                throw 'Got an error: ' + err;
            } else {
                return body;
            }
        }
    );
};
