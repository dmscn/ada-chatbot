const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.listen(process.env.PORT || 5000, () => console.log('Webhook server is listening'));

app.get('/', (req, res) => {
  res.status(200).send('Hello');
});

app.post('/webhook', (req, res) => {

  let body = req.body;

  if(body.object === 'page') {
    body.entry.forEach(entry => {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);      
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }

});

app.get('/webhook', (req, res) => {
  
  let VERIFY_TOKEN = "ada&faeterj-rio";

  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challange = req.query['hub.challenge'];

  if(mode && token) {
    if(mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challange);
    } else {
      // 403 Forbidden
      res.sendStatus(403);
    }
  }

})