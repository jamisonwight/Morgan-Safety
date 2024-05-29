import { instance } from '../../../../lib/api'
import cookie from 'cookie'

export default async (req, res) => {
    if (req.method === 'POST') {
        
        await instance
            .get(`/api/auth/google/callback?access_token=${req.body.access_token}`)
            .then((response) => {
                const jwt = response.data.jwt
                const user = response.data.user
                const id = response.data.user.id
                const paidUser = response.data.user.paidUser

                const userData = {
                    ...user, 
                    firstName: user.First_Name,
                    lastName: user.Last_Name,
                    phoneNumber: user.Phone_Number,
                    address: user.Address,
                    city: user.City,
                    state: user.State,
                    zipcode: user.Zipcode,
                    
                }

                // Set the cookie and then redirect
                const cookieOptions = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                    sameSite: 'strict',
                    path: '/',
                }

                res.setHeader('Set-Cookie', [
                    cookie.serialize('token', jwt, cookieOptions),
                    cookie.serialize('userid', id, cookieOptions),
                    cookie.serialize('user', JSON.stringify(userData), cookieOptions),
                    cookie.serialize('paidUser', paidUser, cookieOptions),
                ])

                return res.status(200).json({ message: userData });
            })
            .catch((error) => {
                res.status(405).json({ message: 'already registered with another provider' });
            });
    }
}