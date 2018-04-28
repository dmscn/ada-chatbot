
const callSendApi = require('../controllers/callSendApi');

module.exports = (sender_psid, received_message) => {

  if(webhook_event.message.text) {
    response = {
      'text': `Received. ${JSON.stringify(webhook_event)}`
    }
  }

  callSendApi(sender_psid, response);
}
