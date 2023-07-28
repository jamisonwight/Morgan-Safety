import { instance } from '../../lib/api'
import cookie from "cookie";

export default async (req, res) => {
    const { token: jwt } = cookie.parse(req.headers.cookie)

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    try {
        const { 
            state: State, 
            address: Address, 
            city: City, 
            amount: Amount, 
            trainingType: TrainingType, 
            token 
        } = req.body

        console.log(jwt)

        // Make a POST request to the Strapi registration endpoint
        await instance.post(`/api/training-payment`, {
            State,
            Address,
            City,
            Amount,
            TrainingType,
            token,
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
        console.log(message)
        return res.status(500).json({ message })
    }
}