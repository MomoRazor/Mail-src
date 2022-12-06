import { Schema, Model, Connection } from 'mongoose'

export interface Mail {
    from: string
	to: string
	subject: string
	body: string
	service: 'Mailgun'
    status: 'Sent' | 'Error' | 'Pending'
}

export type IMailRepo = Model<Mail>

const MailSchema = new Schema<Mail>({
	from: { type: Schema.Types.String, required: true },
	to: { type: Schema.Types.String, required: true },
	subject: { type: Schema.Types.String, required: true },
	body: { type: Schema.Types.String, required: true },
	service: { type: Schema.Types.String, enum: ['Mailgun'], required: true, default: 'Mailgun' },
	status: { type: Schema.Types.String, enum: ['Sent', 'Error', 'Pending'], required: true, default: 'Pending' },
})

export const MailRepo = async (connection: Connection): Promise<IMailRepo> => {
	const mailRepo = connection.model<Mail>('mail', MailSchema)
	await mailRepo.syncIndexes()
	return mailRepo
}
