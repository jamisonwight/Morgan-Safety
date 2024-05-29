import React, { useEffect, useContext } from 'react'
import useRouter from 'next/router'
import { UserContext } from '../../context/user'

import ResetPasswordForm from '../../components/resetPasswordForm'

export default function resetPassword() {
    const { user } = useContext(UserContext)

    if (user.confirmed) {
        return <div>{user.confirmed}</div>
    } else {
        return <ResetPasswordForm />
    }
}