const mongoose = require('mongoose'),
      Survey = mongoose.model('surveys'),
      Mailer = require('../services/Mailer'),
      surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const requireLogin = require('../middlewares/requireLogin'),
      requireCredits = require('../middlewares/requireCredits');

module.exports = (app) => {
    app.get('/api/surveys/thanks', requireLogin, (req, res) => {
        res.send('Thanks for voting');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title, body, subject,
            recipients: recipients.split(',').map(email => ({
                email: email.trim()
            })),
            _user: req.user.id,
            dateSent: new Date()
        })
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();        
            res.send(user);
        } catch(error) {
            res.status(422).send(error)
        }
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        console.log('[Sendgrid req]', req.body);
        res.send({});
    });
}