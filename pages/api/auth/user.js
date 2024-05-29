import { instance } from '../../../lib/api'
import cookie from 'cookie'

export default async (req, res) => {
    if (req.method === 'GET') {
        
        const { token, user } = cookie.parse(req.headers.cookie)

        if (!token) {
            console.log('no token')
            return res.status(403).json({ message: 'not authorized' })
        }

        res.status(200).json(user)
    }
}