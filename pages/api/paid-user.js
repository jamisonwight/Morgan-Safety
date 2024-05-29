import cookie from 'cookie'
import { instance } from '../../lib/api'

export default async (req, res) => {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const { userID, paidUser } = req.body
    const { token: jwt } = cookie.parse(req.headers.cookie)

    const updateData = {
        paidUser: paidUser
    }

    // Prepare the headers with the JWT token (if needed)
    const headers = {
        'Authorization': `Bearer ${jwt}`,
    }

    try {
        // Make the PUT request to update the user
        await instance.put(`/api/users/${userID}`, updateData, { headers })

        // Set the cookie and then redirect
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: 'strict',
            path: '/',
        }

        res.setHeader('Set-Cookie', cookie.serialize('paidUser', paidUser, cookieOptions))

        return res.json({ paidUser: paidUser })
    } catch (error) {
        const message = error?.response?.data?.error?.message || 'Internal Server Error'
        console.log(error)
        return res.status(500).json({ message })
    }
}