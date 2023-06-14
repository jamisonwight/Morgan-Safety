import { useState, createContext } from 'react'
import axios from 'axios'
import getConfig from "next/config"


export const UserContext = createContext(null)

const UserProvider = ({ children, showForm, setShowForm }) => {
    const { publicRuntimeConfig } = getConfig()
    const [dummy, setDummy] = useState()

    async function dummyfunction() {
        return "dummy function invoked"
    }

    async function doRegister(values) {
        // var ret = ['niente'
        try {
            await axios.post(`${publicRuntimeConfig.BASE_URL}/api/auth/register`, values)
            return ['OK', resp.data.message]
        } catch (error) {
            return ['alert', 'its all fucked']
        }
    }

    const useract = {
        dummy: dummy,
        setDummy: setDummy,
        dummyfunction: dummyfunction,
        doRegister: doRegister,
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