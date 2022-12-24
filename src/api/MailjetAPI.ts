import { Application } from 'express'
import { IMailgunSvc } from '../svc'

export const MailjetApi = (
	app: Application,
	mailJetSvc: IMailjetSvc,
	prefix: string
) => {
	app.post(`${prefix}/mailjet/send`, async (req, res) => {
		try {
			const { body } = req

			const newMail = await mailJetSvc.send(
                body.from,
                body.to,
                body.subject,
                body.html,
                body.hosted,
            )

			return res.status(200).json({
				data: newMail,
				errors: [],
			})
		} catch (e: any) {
			console.error(e)
			return res.status(500).json({
				data: null,
				errors: [e.message],
			})
		}
	})
}
