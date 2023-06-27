import { useRouter } from 'next/router'
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../context/user'

export default function GoogleCallback() {

    const [ error, setError ] = useState()
    const router = useRouter()
    const { doGoogleCallback, user, setUser } = useContext(UserContext)

    useEffect(() => {
        if (router.query.access_token) {
            const res = doGoogleCallback({
                access_token: router.query.access_token,
            })

            if (res[0] === 'alert') {
                setError(res[1])
            }

            console.log(res[1]['username'])
            console.log(res[1]['email'])
            setUser(res[1])
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