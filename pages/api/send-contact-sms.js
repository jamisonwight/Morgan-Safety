import api from '../../lib/clicksend'
import 'dotenv/config'

export default async (req, res) => {
    const { 
        name, 
        email, 
        phoneNumber, 
        formType, 
        trainingType, 
        numberOfPeople, 
        comments 
    } = req.body;
  
    try {
        const smsApi = new api.SMSApi(process.env.CLICKSEND_USERNAME, process.env.CLICKSEND_API_KEY)
    
        const message = new api.SMSMessage()

        message.from = 'Morgan Safety Services'
        message.to = process.env.CLICKSEND_NUMBERS // Replace with your admin phone number
        message.body = `
            New Contact 
            
            Name: ${name}
            Email: ${email}
            Phone: ${phoneNumber}
            Form Type: ${formType}
            ${(trainingType) ? 'Training Type: ' + trainingType : ''}
            ${(numberOfPeople) ? 'Number Of People: ' + numberOfPeople : ''}
            
            Message: ${comments}
        `;
    
        var smsCollection = new api.SmsMessageCollection()

        smsCollection.messages = [message]
        
        smsApi.smsSendPost(smsCollection).then(function(response) {
            console.log(response.body)
            res.status(200).json({ success: true });
        }).catch(function(err){
            console.error(err.body)
        })
    } catch (error) {
        console.error('SMS error:', error);
        res.status(500).json({ success: false });
    }
}