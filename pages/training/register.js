import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../../context/user'

import TrainingRegisterForm from '../../components/trainingRegisterForm'

export default function Register() {
    const { user, checkPaidUser } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        checkPaidUser(user)
    }, [])

    if (user.paidUser) {
        router.push('/training')
    } else {
        return <TrainingRegisterForm />
    }
}