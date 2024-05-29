import { instance } from '../../lib/api'
import cookie from "cookie";

export default async (req, res) => {
    const { token: jwt } = cookie.parse(req.headers.cookie)

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    try {
        const { 
            firstName: First_Name,
            lastName: Last_Name,
            phoneNumber: Phone_Number,
            state: State, 
            address: Address, 
            city: City,
            zipcode: Zipcode, 
            amount: Amount, 
            trainingType: TrainingType, 
            token 
        } = req.body

        // Make a POST request to the Strapi registration endpoint
        await instance.post(`/api/training-payments`, {
            data: {
                First_Name,
                Last_Name,
                Phone_Number,
                State,
                Address,
                City,
                Zipcode,
                Amount,
                TrainingType,
                token,
            }
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        })

        return res.status(200).json({
            message: `You have successfully paid for training.`,
        })
    } catch (error) {
        // Payment failed
        const message = error?.response?.data?.error?.message || 'Internal Server Error'
        console.log(error)
        return res.status(500).json({ message })
    }
}