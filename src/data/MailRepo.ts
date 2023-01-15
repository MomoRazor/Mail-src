import { Schema, Model, Connection } from 'mongoose';

export interface PaginationFilter {
    filter: any;
    page: number;
    limit: number;
    sort: string;
    projection: string;
}

export type MailStatus = 'Sent' | 'Error' | 'Pending';

export interface Mail {
    from: string;
    to: string;
    subject: string;
    body: string;
    service: 'Mailgun' | 'Mailjet';
    error?: any;
    request?: any;
    status: MailStatus;
}

export type IMailRepo = Model<Mail>;

const MailSchema = new Schema<Mail>({
    from: { type: Schema.Types.String, required: true },
    to: { type: Schema.Types.String, required: true },
    subject: { type: Schema.Types.String, required: true },
    body: { type: Schema.Types.String, required: true },
    service: { type: Schema.Types.String, enum: ['Mailgun', 'Mailjet'], required: true },
    error: { type: Schema.Types.Mixed, required: false },
    request: { type: Schema.Types.Mixed, required: false },
    status: {
        type: Schema.Types.String,
        enum: ['Sent', 'Error', 'Pending'],
        required: true,
        default: 'Pending'
    }
});

export const MailRepo = async (connection: Connection): Promise<IMailRepo> => {
    const mailRepo = connection.model<Mail>('mail', MailSchema);
    await mailRepo.syncIndexes();
    return mailRepo;
};
