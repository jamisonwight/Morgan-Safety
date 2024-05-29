import { instance } from '../../../lib/api'
import cookie from 'cookie'

export default async (req, res) => {
    if (req.method === 'POST') {
        
        const { token, user } = cookie.parse(req.headers.cookie)
        const newData = req.body
        const updatedUser = { ...JSON.parse(user), ...newData.data }
        const cookies = cookie.parse(req.headers.cookie)

        // Set the cookie and then redirect
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: 'strict',
            path: '/',
        }

        try {
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('user', '', cookieOptions)
            )

            res.setHeader(
                'Set-Cookie',
                cookie.serialize('user', JSON.stringify(updatedUser), cookieOptions)
            )

            console.log(cookies['user'])
            console.log(updatedUser)
    
            res.status(200).json(updatedUser)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error })
        }

        if (!token) {
            console.log('no token')
            return res.status(403).json({ message: 'not authorized' })
        }
    }
}