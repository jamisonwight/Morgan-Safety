import cookie from 'cookie'
import { instance } from '../../lib/api'

export default async (req, res) => {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const { id, userData } = req.body

    const { token: jwt } = cookie.parse(req.headers.cookie)

    const data = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        state: userData.state,
        address: userData.address,
        city: userData.city,
        zipcode: userData.zipcode,
    }

    // Prepare the headers with the JWT token (if needed)
    const headers = {
        'Authorization': `Bearer ${jwt}`,
    }

    try {
        // Make the PUT request to update the user
        await instance.put(`/api/users/${id}`, {
            First_Name: userData.firstName,
            Last_Name: userData.lastName,
            Phone_Number: userData.phoneNumber,
            State: userData.state,
            Address: userData.address,
            City: userData.city,
            Zipcode: userData.zipcode,
        }, { headers })

        console.log('register data: ' + JSON.stringify(data))

        return res.json({ data })
    } catch (error) {
        const message = error?.response?.data?.error?.message || 'Internal Server Error'
        console.log(error)
        return res.status(500).json({ message })
    }
}