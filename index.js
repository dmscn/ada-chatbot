
const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const webhookValidation = require('./controllers/verification.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.listen(process.env.PORT || 5000, () => console.log('Webhook server is listening'));

const PAGE_ACCESS_TOKEN = "EAARwOZB1nYnkBAIZCr7ZBljyqhjGme1nwZBoMS1eVREzEg2YqFNyeJHAxiYjz1EmhHzm9LYauUNLFd8wyuN11JOkhNUx4yGePeAdFeJ82nY9yUHklpGyxfC0xXLQIbPA9Y1ug6ELHIAG93I18dGrnXPlPCuh7ZBtgIcwmWDqnxQZDZD";

app.get('/', (req, res) => {
  res.send('App is on');
});

// webhook verification
app.get('/webhook', webhookVerification);

// webhook endpoint
app.post('/webhook', (req, res) => {

  let body = req.body;

  if(body.object === 'page') {

    body.entry.forEach(entry => {

      let webhook_event = entry.messaging[0];
      console.log('WebHook Event: ', webhook_event);

      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);
      
      if(webhook_event.message) {
        // handleMessage(sender_psid, webhook_event.message);
        if(webhook_event.message.text) {
          response = {
            'text': `Received. ${webhook_event}`
          }
        }

        // callSendApi(sender_psid, response);
        let request_body = {
          "recipient": {
            "id": sender_psid
          },
          "message": response
        }

        // http request to messenger platform
        request({
          "uri": "https://graph.facebook.com/v2.6/me/messages",
          "qs": { "access_token": PAGE_ACCESS_TOKEN },
          "method": "POST",
          "json": request_body
        }, (err, res, body) => {
          if(!err) {
            console.log('Message Sent!');
          } else {
            console.log('Unable to send message: ', err);
          }
        })

      } else if(webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }

    });

    // return status 200OK to all events received
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }

});

