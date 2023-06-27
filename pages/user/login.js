import React, { useEffect, useContext } from 'react'
import useRouter from 'next/router'
import { UserContext } from '../../context/user'

import LoginForm from '../../components/loginForm'

export default function Login() {
    const { user, setUser, checkLogin } = useContext(UserContext)

    useEffect(() => {
        const res = checkLogin()
        if (res.status === 200) {
            setUser(res.data)
        }
    }, [])

    if (user) {
        useRouter.push('/user')
    } else {
        return <LoginForm />
    }
}