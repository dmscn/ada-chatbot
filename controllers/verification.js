export default (req, res) => {
  
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
      res.sendStatus(403).end();
    }
  }
}