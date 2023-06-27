import React, { useEffect, useContext } from 'react'
import useRouter from 'next/router'
import RegisterForm from '../../components/registerForm'
import { UserContext } from '../../context/user'

export default function Register() {
    const { user, checkLogin } = useContext(UserContext)
    
    useEffect(() => {
        checkLogin()
    }, [])

    if (user) {
        useRouter.push('/user')
    } else {
        return <RegisterForm />
    }
}