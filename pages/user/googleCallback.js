import { useRouter } from 'next/router'
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../context/user'

export default function GoogleCallback() {

    const [ error, setError ] = useState()
    const router = useRouter()
    const { doGoogleCallback, user, setUser } = useContext(UserContext)

    useEffect(() => {
        if (router.query.access_token) {
            doGoogleCallback({
                access_token: router.query.access_token,
            })
        }
    }, [router])

    if (user) {
        router.push('/user')
    }

    if (error) {
        router.push(`/user?msg=${error}`)
    }

    return <p>Loggin in with Google</p>
}