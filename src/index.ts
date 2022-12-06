import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { sendEmail } from './mailgunFunctions';
import { authRoutes } from './api/AuthApi';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import { MailgunSvc } from './svc';
import { MailRepo } from './data';

const main = async () => {
	// Init database
	const databaseConnection = mongoose.createConnection(MONGO_URL)


	const mailRepo = await MailRepo(databaseConnection)

    const mailgun = new Mailgun(FormData);

	const mailgunSvc = MailgunSvc(mailRepo,mailgun)

    
    const app = express();

    app.use(cors());
    app.use(helmet());


    AuthApi(app)


}


app.post('/send', json(), async (req, res) => {
    if (req.body.mailgunId && req.body.mailgunDomain) {
        if (req.body.from && req.body.to && req.body.subject && req.body.html) {
            try {
                await sendEmail(
                    req.body.mailgunId,
                    req.body.mailgunDomain,
                    req.body.from,
                    req.body.to,
                    req.body.subject,
                    req.body.html,
                    req.body.hosted
                );
                res.status(200).send('Successfully send email!');
            } catch (e) {
                console.error(e);
                res.status(500).send(e);
            }
        } else {
            console.error('Email Information Missing');
            res.status(400).send('Email Information Missing');
        }
    } else {
        console.error('Required Credentials Missing');
        res.status(400).send('Required Credentials Missing');
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}...`);
});
