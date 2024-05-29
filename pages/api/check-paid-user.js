import cookie from 'cookie'

export default async (req, res) => {
    if (req.method === 'GET') {
        
        const { token, paidUser } = cookie.parse(req.headers.cookie)
        const regexPattern = new RegExp("true")
        const paidUserBool = regexPattern.test(paidUser)

        if (!token) {
            return res.status(403).json({ message: 'not authorized' })
        }

        try {
            res.status(200).json({paidUser: paidUserBool})
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: 'not authorized' })        }
    }
}