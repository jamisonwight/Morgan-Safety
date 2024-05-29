import React, { useEffect, useContext } from 'react'
import useRouter from 'next/router'
import { UserContext } from '../../context/user'
import ResetPasswordConfirmForm from '../../components/resetPasswordConfirmForm'

export default function Login() {
    const { user, checkLogin, intentPurchase } = useContext(UserContext)

    useEffect(() => {
        checkLogin()
    }, [])

    if (user.confirmed && !intentPurchase) {
        useRouter.push('/')
    } else {
        return <ResetPasswordConfirmForm />
    }
}