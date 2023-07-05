import React, { useEffect, useContext } from 'react'
import useRouter from 'next/router'
import { UserContext } from '../../context/user'

import LoginForm from '../../components/loginForm'

export default function Login() {
    const { user, checkLogin } = useContext(UserContext)

    useEffect(() => {
        checkLogin()
    }, [])

    if (user.confirmed) {
        useRouter.push('/')
    } else {
        return <LoginForm />
    }
}