import { instance } from '../../../lib/api'
import cookie from 'cookie'

export default async (req, res) => {
    if (req.method === 'GET') {
        const { token } = cookie.parse(req.headers.cookie)

        if (!token) {
            return res.status(403).json({ message: 'not authorized' })
        }

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', 'https://morgansafetyservices.com')
        res.setHeader('Access-Control-Allow-Methods', 'GET')
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')

        try {
            const response = await instance.get('/api/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            res.status(200).json({
                user: response.data.user,
                email: response.data.user.email,
                id: response.data.user.id,
            })
        } catch (error) {
            res.status(403).json({ message: 'not authorized' })
        }
    }
}