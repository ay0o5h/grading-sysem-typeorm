const accountSid = 'AC1ec944609532d00468cecce1145b5575'; 
const authToken = 'cb6f14425becfcea726e09609b765829'; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({         
        body: 'Hello',     
        to: '+9647805847657',
        from: "+18066066506"
       }) 
      .then(message => console.log(message.sid)) 
      .done();