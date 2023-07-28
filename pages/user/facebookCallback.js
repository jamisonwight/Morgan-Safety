import { useRouter } from 'next/router'
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../context/user'

export default function GoogleCallback() {

    const [ error, setError ] = useState()
    const router = useRouter()
    const { doFacebookCallback, user, setUser } = useContext(UserContext)

    useEffect(() => {
        if (router.query.access_token) {
            doFacebookCallback({
                access_token: router.query.access_token,
            })
        }
    }, [router])

    if (user.confirmed) {
        router.push('/')
    }

    if (error) {
        router.push(`/?msg=${error}`)
    }

    return <p>Loggin in with Facebook</p>
}