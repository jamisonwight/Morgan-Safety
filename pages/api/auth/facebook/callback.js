import { instance } from '../../../../lib/api'
import cookie from 'cookie'

export default async (req, res) => {
    if (req.method === 'POST') {
        
        await instance
            .get(`/api/auth/facebook/callback?access_token=${req.body.access_token}`)
            .then((response) => {
                const jwt = response.data.jwt
                const user = response.data.user
                const id = response.data.user.id

                res.setHeader('Set-Cookie', [
                    cookie.serialize('token', jwt, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 60 * 24 * 7, // 1 week
                        sameSite: 'strict',
                        path: '/',
                    }),
                    cookie.serialize('userid', id, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 60 * 24 * 7, // 1 week
                        sameSite: 'strict',
                        path: '/',
                    }),
                    cookie.serialize('user', JSON.stringify(user), { // Add this line
                        httpOnly: false, // Adjust as per your requirement
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 60 * 24 * 7, // 1 week
                        sameSite: 'strict',
                        path: '/',
                    }),
                ])

                return res.status(200).json({ message: user });
            })
            .catch((error) => {
                res.status(405).json({ message: 'already registered with another provider' });
            });
    }
}