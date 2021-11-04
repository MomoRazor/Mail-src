import axios from 'axios';
import { EUBaseURL, Hosted, USBaseURL } from './config';

export const sendEmail = async (
    mailgunId: string,
    mailgunDomain: string,
    from: string,
    to: string[],
    subject: string,
    html: string,
    hosted?: Hosted
) => {
    console.log(hosted === Hosted.US ? USBaseURL : EUBaseURL + 'v3/' + mailgunDomain);

    console.log({
        from: from,
        to: to,
        subject: subject,
        html: html
    });

    return await axios.post(
        hosted === Hosted.US ? USBaseURL : EUBaseURL + 'v3/' + mailgunDomain,
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
