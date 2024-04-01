import 'dotenv/config'

var api =  require('../../lib/clicksend')

export default async (req, res) => {
    const { 
        name, 
        email, 
        phoneNumber, 
        formType, 
        trainingType, 
        numberOfPeople, 
        comments 
    } = req.body

    try {
        const dedicatedNumber = process.env.CLICKSEND_DEDICATED_NUMBER // From number for the SMS messages
        const recipientNumbers = process.env.CLICKSEND_NUMBERS // All Numbers to send SMS Message
        const recipientNumbersArray = recipientNumbers.split(',').map(number => number.trim()) 

        recipientNumbersArray.map(async (number) => {
            try {
                const smsApi = new api.SMSApi(process.env.CLICKSEND_USERNAME, process.env.CLICKSEND_PASSWORD)
                smsApi.basePath = 'https://rest.clicksend.com/v3'
            
                const message = new api.SmsMessage()

                message.from = dedicatedNumber
                message.to = number // Phone number to recieve this SMS Message
                message.body = `
                    MORGAN SAFETY SERVICES
                    
                    ** New Contact **
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
                
                const response =  await smsApi.smsSendPost(smsCollection)
            } catch (error) {
                console.log('SMS response:', error)
            }
        })

        // Response OK
        res.status(200).json({ success: true })
    } catch (error) {
        console.error('SMS error:', error)

        // Response Internal Error
        res.status(500).json({ success: false })
    }
}