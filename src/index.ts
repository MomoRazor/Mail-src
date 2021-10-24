import express from 'express';
import { bouncer } from './middleware';
import { json } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { sendEmail } from './mailgunFunctions';

const app = express();

app.use(cors());
app.use(helmet());
app.use(bouncer);

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
                    req.body.html
                );
                res.send('Successfully send email!');
            } catch (e) {
                res.status(500).send(e);
            }
        } else {
            res.status(400).send('Email Information Missing');
        }
    } else {
        res.status(400).send('Required Credentials Missing');
    }
});

app.get('/', (_, res) => {
    res.send('Hello from my Mailgun Service!');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
