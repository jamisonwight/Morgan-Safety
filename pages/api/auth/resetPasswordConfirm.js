import { instance } from '../../../lib/api'
import getConfig from "next/config"

export default async (req, res) => {
    const { publicRuntimeConfig } = getConfig()

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    try {
        const { code, password, repeatPassword } = req.body

        // Make a POST request to the Strapi registration endpoint
        await instance.post(`${publicRuntimeConfig.API_URL}/api/auth/reset-password`, {
            code: code, // code contained in the reset link of step 3.
            password: password,
            passwordConfirmation: repeatPassword,
        })
        return res.status(200).json({
            message: `Your new password has been reset.`,
        })
    } catch (error) {
        // Registration failed
        const message = error?.response?.data?.error?.message || 'Internal Server Error'
        return res.status(500).json({ message })
    }
}