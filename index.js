
const express = require('express');
const bodyParser = require('body-parser');
const webhookVerification = require('./controllers/verification.js');
const webhookEventHandler = require('./controllers/webhookEventHandler');

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
app.post('/webhook', webhookEventHandler);

