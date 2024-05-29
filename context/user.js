import { useState, createContext } from 'react'
import { linstance } from '../lib/api'
import { useRouter }  from 'next/router'
import { message } from '../utils/message'

export const UserContext = createContext(null)

const UserProvider = ({ children, showForm, setShowForm }) => {
    const router = useRouter()

    const [user, setUser] = useState({
        confirmed: false,
        id: 0,
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        state: '',
        city: '',
        zipcode: '',
        paidUser: false,
        trainingComplete: false,
    })
    const [email, setEmail] = useState()
    const [id, setId] = useState()
    const [intentPurchase, setIntentPurchase] = useState()
    const [paidUser, setPaidUser] = useState(false)

    const updateUserData = (_data) => {
        setUser(prevUser => ({ ...prevUser, ..._data }))
        setEmail(_data.email)
        setId(_data.id)
        setPaidUser(_data.paidUser)
    }

    const doRegister = async (values) => {
        // var ret = ['niente']
        try {  
            const resp = await linstance.post(`/api/auth/register`, values)
            return ['OK', resp.data.message]
        } catch (error) {
            return ['alert', error.response.data.message]
        }
    }

    const doLogin = async (values) => {
        try {
            const resp = await linstance.post('/api/auth/login', values)
            const _data = resp.data.message
            
            updateUserData(_data)

            return _data
        } catch (error) {
            return ['alert', error.response.data.message]
        }
    }

    const checkLogin = async () => {
        try {
            const resp = await linstance.get('/api/auth/user')
            const _data = JSON.parse(resp.data)

            updateUserData(_data)

            return _data
        } catch (error) {
            return error.response
        }
    }

    const doLogout = async () => {
        const resp = await linstance.post('/api/auth/logout', { method: 'POST' })
        if (resp.data.message == 'success') {
            setUser('')
            setEmail('')
            setId('')
            setPaidUser(false)
            router.push('/user/login')
        }
    }

    const doResetPassword = async (values) => {
        try {
            const resp = await linstance.post('/api/auth/resetPassword', values)
            return resp.data.message
        } catch (error) {
            return ['alert', error.response.data.message]
        }
    }

    const doResetPasswordConfirm = async (values) => {
        try {
            const resp = await linstance.post('/api/auth/resetPasswordConfirm', values)
            router.push(`/user/login?msg=${message.auth.resetPasswordSuccess}`)
            return resp.data.message
        } catch (error) {
            return ['alert', error.response.data.message]
        }
    }

    const doGoogleCallback = async (values) => {
        try {
            const resp = await linstance.post('/api/auth/google/callback', values)
            const _data = resp.data.message

            updateUserData(_data)

            return ['OK', _data]
        } catch (error) {
            return ['alert', error.response.data.message]
        }
    }

    const doFacebookCallback = async (values) => {
        try {
            const resp = await linstance.post('/api/auth/facebook/callback', values)
            const _data = resp.data.message

            updateUserData(_data)

            return ['OK', _data]
        } catch (error) {
            return ['alert', error.response.data.message]
        }
    }

    const doIntentPurchase = async (isIntent) => {
        setIntentPurchase(isIntent)
    }

    const doPaidUser = async (userID, isPaid) => {
        try {
            const _data = {
                userID: userID,
                paidUser: isPaid,
            }

            const resp = await linstance.post('/api/paid-user', _data)

            if (resp.data.paidUser) {
                setPaidUser(resp.data.paidUser)
                updateUserData({paidUser: resp.data.paidUser})

                router.push('/training')
            } else {
                router.push(`/checkout?msg=${message.checkout.errorProcessing}`)
            }
            return ['OK', _data]
        } catch (error) {
            return ['alert', error]
        }
    }

    const checkPaidUser = async (user) => {
        try {
            const resp = await linstance.get('/api/check-paid-user')
            const _data = resp.data.paidUser

            // if (user.firstName == '') {
            //     router.push('/training/register')
            // }
            setPaidUser(_data)
            return _data
        } catch (error) {
            setPaidUser(false)
            return ['alert', error]
        }
    }

    const checkTrainingRegister = async () => {
        if (!user.firstName) {
            router.push(`/training/register?msg=${message.checkout.accessDeniedRegister}`)
        } else if (paidUser) {
            router.push(`/training`)
        }
    }

    const checkTrainingUser = async (user) => {
        if (!user.firstName) {
            router.push('/training/register')
        } else if (!user.paidUser && !paidUser) {
            router.push('/checkout')
        } 
    }

    const doRegisterTraining = async (userID, values) => {
        try {
            const registerResp = await linstance.post('/api/register-training', {
                id: userID, 
                userData: values
            })

            // Update the user cookie object with new user fields from register
            const newUserResp = await linstance.post('/api/auth/updateUserCookie', registerResp.data)

            // Set new user state for current context
            updateUserData(newUserResp.data)

            if (newUserResp.data.paidUser) {
                router.push('/training')
            } else {
                router.push('/checkout')
            }

            return ['OK', 'SUCCESS']
        } catch (error) {
            return ['alert', error]
        }
    }

    const useract = {
        doRegister: doRegister,
        user: user,
        setUser: setUser,
        email: email,
        setEmail: setEmail,
        id: id,
        setId: setId,
        checkLogin: checkLogin,
        doLogin: doLogin,
        doLogout: doLogout,
        doResetPassword: doResetPassword,
        doResetPasswordConfirm: doResetPasswordConfirm,
        doGoogleCallback: doGoogleCallback,
        doFacebookCallback: doFacebookCallback,
        intentPurchase: intentPurchase,
        setIntentPurchase: doIntentPurchase,
        setPaidUser: setPaidUser,
        paidUser: paidUser,
        doPaidUser: doPaidUser,
        checkPaidUser: checkPaidUser,
        doRegisterTraining: doRegisterTraining,
        checkTrainingUser: checkTrainingUser,
        checkTrainingRegister: checkTrainingRegister,
    }

    return (
        <UserContext.Provider 
            value={useract}
            showForm={showForm}
            setShowForm={setShowForm}
            >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider