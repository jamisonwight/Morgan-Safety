import { useState, createContext } from 'react'
import { linstance } from '../lib/api'
import useRouter from 'next/router'
import cookie from 'cookie'

export const UserContext = createContext(null)

const UserProvider = ({ children, showForm, setShowForm }) => {
    const [user, setUser] = useState({
        confirmed: false,
        id: 0,
        username: '',
        email: '',
    })
    const [email, setEmail] = useState()
    const [id, setId] = useState()

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
            return resp.data.message
        } catch (error) {
            return ['alert', error.response.data.message]
        }
    }

    const checkLogin = async () => {
        try {
            const resp = await linstance.get('/api/auth/user')
            const _data = JSON.parse(resp.data)

            setUser({
                confirmed: _data.confirmed,
                id: _data.id,
                username: _data.username,
                email: _data.email,
            })
            setEmail(_data.email)
            setId(_data.id)

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
            useRouter.push('/user/login')
        }
    }

    const doGoogleCallback = async (values) => {
        try {
            const resp = await linstance.post('/api/auth/google/callback', values)
            const _data = resp.data.message

            setUser({
                confirmed: _data.confirmed,
                id: _data.id,
                username: _data.username,
                email: _data.email,
            })
            setEmail(_data.email)
            setId(_data.id)

            return ['OK', _data]
        } catch (error) {
            return ['alert', error.response.data.message]
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
        doGoogleCallback: doGoogleCallback,
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