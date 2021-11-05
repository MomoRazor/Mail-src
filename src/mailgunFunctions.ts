import axios from 'axios';
import { EUBaseURL, Hosted, USBaseURL } from './config';
import FormData from 'form-data';

export const sendEmail = async (
    mailgunId: string,
    mailgunDomain: string,
    from: string,
    to: string[],
    subject: string,
    html: string,
    hosted?: Hosted
) => {
    const form = new FormData();

    form.append('fron', from);
    form.append('to', to);
    form.append('subject', subject);
    form.append('html', html);

    return await axios.post(
        hosted === Hosted.US ? USBaseURL : EUBaseURL + 'v3/' + mailgunDomain + '/messages',
        form,
        {
            headers: form.getHeaders(),
            auth: {
                username: 'api',
                password: mailgunId
            }
        }
    );
};
