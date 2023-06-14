import axios from '../../../lib/api'

export default async (req, res) => {
    const { username, password, email } = req.body

    if (req.method === 'POST') {
        
        res = await axios
        .post('/auth/local/register', {username, password, email}, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            return res.status(200).json({
                message: `Check your email (${req.body.email}) and follow the instructions to confirm your account.`,
            })
        })
        .catch((error) => {
            if (!error.response.data.error.message) {
                return res.status(500).json({ message: 'Internal server error' });
              } else {
                const messages = error.response.data.error.message;
                return res.status(403).json({ message: messages });
              }
        })
    }
}