import axios from 'axios';
import { EUBaseURL } from './config';

export const sendEmail = async (
    mailgunId: string,
    mailgunDomain: string,
    from: string,
    to: string[],
    subject: string,
    html: string
) => {
    return await axios.post(
        EUBaseURL + '/v3/' + mailgunDomain,
        {
            from: from,
            to: to,
            subject: subject,
            html: html
        },
        {
            auth: {
                username: 'api',
                password: mailgunId
            }
        }
    );
};
