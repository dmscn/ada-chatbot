
const callSendApi = require('../controllers/callSendApi');

module.exports = (sender_psid, received_message) => {

  if(received_message.message.text) {
    response = {
      'text': `Received. ${JSON.stringify(received_message)}`
    }
  }

  callSendApi(sender_psid, response);
}
