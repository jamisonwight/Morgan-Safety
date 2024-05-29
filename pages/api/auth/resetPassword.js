import { instance } from '../../../lib/api'
import getConfig from "next/config"

export default async (req, res) => {
    const { publicRuntimeConfig } = getConfig()

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    try {
        const { email } = req.body
        return res.status(200).json({
            message: `Check your email (${email}) and follow the instructions to reset your password.`,
        })
    } catch (error) {
        // Registration failed
        const message = error?.response?.data?.error?.message || 'Internal Server Error'
        return res.status(500).json({ message })
    }
}