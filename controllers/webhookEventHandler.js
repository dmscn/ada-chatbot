
const handleMessage = require('../helpers/handleMessage.js');
const handlePostback = require('../helpers/handlePostback.js');

module.exports = (req, res) => {

	let body = req.body;

	if(body.object === 'page') {

		body.entry.forEach(entry => {

			let webhook_event = entry.messaging[0];			
      console.log("WebHook Event: ", webhook_event);

      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

			// message
      if (webhook_event.message && webhook_event.message.text) {
				handleMessage(sender_psid, webhook_event.message);
				
			} 
			// postback
			else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
		}); 
		
		// return status 200OK to all events received
    res.status(200).send("EVENT_RECEIVED");
	} 
	else {
		res.sendStatus(404);
	}
}