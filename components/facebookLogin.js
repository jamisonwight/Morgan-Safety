import React from 'react'
import getConfig from 'next/config'
import { AiFillFacebook } from 'react-icons/ai'

export default function FacebookLogin() {

    const { publicRuntimeConfig } = getConfig()
    
    const styles = {
        btn_container: `btn-container w-fill flex justify-center my-[20px]`,
        button: `btn btn-hollow-cyan !flex-row items-center`,
        icon: `inline-block w-[30px] h-[30px]`,
        span: 'inline-block ml-[10px]'
    }

    return (
        <div className={styles.btn_container}>
            <button
                className={styles.button}
                onClick={() => (
                    window.location = `${publicRuntimeConfig.API_URL}/api/connect/google`
                )}
                >
                <AiFillFacebook className={styles.icon} /> 
                <span className={styles.span}> Sign In with Facebook</span>
            </button>
        </div>
    )
}