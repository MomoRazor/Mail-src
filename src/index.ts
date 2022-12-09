import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { AuthApi, MailApi, MailgunApi } from './api';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import { MailgunSvc, MailSvc } from './svc';
import { MailRepo } from './data';
import mongoose from 'mongoose';
import { MONGO_URL, PORT } from './env';

const main = async () => {
	// Init database
	const databaseConnection = mongoose.createConnection(MONGO_URL)

	const mailRepo = await MailRepo(databaseConnection)

    const mailgun = new Mailgun(FormData);

	const mailgunSvc = MailgunSvc(mailRepo,mailgun)
    const mailSvc = MailSvc(mailRepo)

	const prefix = '/mail'
    
    const app = express();

    app.use(cors());
    app.use(helmet());

    AuthApi(app)
    MailgunApi(app, mailgunSvc, prefix)
    MailApi(app, mailSvc, prefix)

	// Start application
	app.listen(PORT, () => {
		console.log(`Mail Service Initialised! - ${PORT}`)
		console.log(`========================`)
	})
}

main()
