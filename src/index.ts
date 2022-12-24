import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { AuthApi, MailApi, MailgunApi, MailjetApi } from './api';
import Mailgun from 'mailgun.js';
import Mailjet from 'node-mailjet';
import FormData from 'form-data';
import { MailgunSvc, MailjetSvc, MailSvc } from './svc';
import { MailRepo } from './data';
import mongoose from 'mongoose';
import { MAILJET_KEY, MAILJET_SECRET, MONGO_URL, PORT, USES } from './env';

const main = async () => {
    console.log(MONGO_URL);

    // Init database
    const databaseConnection = mongoose.createConnection(MONGO_URL);

    const mailRepo = await MailRepo(databaseConnection);

    const prefix = '/mail';

    const app = express();

    app.use(cors());
    app.use(helmet());

    const mailSvc = MailSvc(mailRepo);

    AuthApi(app);
    MailApi(app, mailSvc, prefix);
    if (USES === 'Mailgun') {
        const mailgun = new Mailgun(FormData);
        const mailgunSvc = MailgunSvc(mailRepo, mailgun);
        MailgunApi(app, mailgunSvc, prefix);
    } else if (USES === 'Mailjet') {
        const mailjet = new Mailjet({
            apiKey: MAILJET_KEY,
            apiSecret: MAILJET_SECRET
        });

        const mailjetSvc = MailjetSvc(mailRepo, mailjet);
        MailjetApi(app, mailjetSvc, prefix);
    }

    // Start application
    app.listen(PORT, () => {
        console.log(`Mail Service Initialised! - ${PORT}`);
        console.log(`========================`);
    });
};

main();
