import Mailjet from 'node-mailjet';
import { IMailRepo, Mail } from '../data';

export interface IMailjetSvc {
    send: (
        from: {
            email: string;
            name: string;
        },
        to:
            | {
                  email: string;
                  name: string;
              }[]
            | {
                  email: string;
                  name: string;
              },
        subject: string,
        html: string
    ) => Promise<Mail | null>;
}

export const MailjetSvc = (mailRepo: IMailRepo, mailJetInstance: Mailjet) => {
    const send = async (
        from: {
            email: string;
            name: string;
        },
        to:
            | {
                  email: string;
                  name: string;
              }[]
            | {
                  email: string;
                  name: string;
              },
        subject: string,
        html: string
    ) => {
        const mail = await mailRepo.create({
            from,
            to: Array.isArray(to) ? to.join(',') : to,
            subject,
            body: html,
            service: 'Mailjet',
            status: 'Pending'
        });

        if (!mail) {
            throw new Error('Failed to create Mail Object');
        }

        const request = {
            Messages: [
                {
                    From: {
                        Email: from
                    },
                    To: Array.isArray(to)
                        ? to.map((target) => ({
                              Email: target
                          }))
                        : [
                              {
                                  Email: to
                              }
                          ],
                    Subject: subject,
                    HTMLPart: html
                }
            ]
        };
        try {
            await mailJetInstance.post('send', { version: 'v3.1' }).request(request);

            return await mailRepo
                .findByIdAndUpdate(mail._id, {
                    $set: {
                        status: 'Sent',
                        request
                    }
                })
                .lean();
        } catch (e: any) {
            await mailRepo
                .findByIdAndUpdate(mail._id, {
                    $set: {
                        status: 'Error',
                        request,
                        error: e.toString()
                    }
                })
                .lean();
            throw new Error('Failed to send Mail');
        }
    };

    return {
        send
    };
};
