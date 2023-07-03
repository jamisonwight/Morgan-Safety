import axios from 'axios'
import getConfig from "next/config"

export default async (req, res) => {
    const { publicRuntimeConfig } = getConfig()

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    try {
        const { username, email, password } = req.body

        // Make a POST request to the Strapi registration endpoint
        const response = await axios.post(`${publicRuntimeConfig.API_URL}/api/auth/local/register`, {
            username,
            email,
            password,
        })
        return res.status(200).json({
            message: `Check your email (${email}) and follow the instructions to confirm your account.`,
        });
    } catch (error) {
        // Registration failed
        const message = error?.response?.data?.error?.message || 'Internal Server Error'
        return res.status(500).json({ message })
    }
}