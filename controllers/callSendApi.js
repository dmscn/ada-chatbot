const request = require('request');

const PAGE_ACCESS_TOKEN = "EAARwOZB1nYnkBAIZCr7ZBljyqhjGme1nwZBoMS1eVREzEg2YqFNyeJHAxiYjz1EmhHzm9LYauUNLFd8wyuN11JOkhNUx4yGePeAdFeJ82nY9yUHklpGyxfC0xXLQIbPA9Y1ug6ELHIAG93I18dGrnXPlPCuh7ZBtgIcwmWDqnxQZDZD";

module.exports = (sender_psid, response) => {
  
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

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
}