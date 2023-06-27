import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import getConfig from "next/config"
import { UserContext } from '../context/user'
import GoogleLogin from './googleLogin'
import FacebookLogin from './facebookLogin'

export default function LoginForm() {
    
    const { setUser, doLogin } = useContext(UserContext)
    const [ alert, setAlert]  = useState(['', ''])
    const [ loggingIn, setLoggingIn ] = useState()
    const { register, handleSubmit } = useForm()

    const onSubmit = async (values) => {
        setLoggingIn(true)

        const _return = await doLogin(values)

        if (_return[0] === 'alert') {
            setAlert(_return)
        } else {
            setUser(_return.message.username)
        }

        setLoggingIn(false)
    }

    const styles = {
        main: `w-full h-full relative left-[50%] translate-x-[-50%] flex justify-center py-[100px] max-w-[1440px] bg-black \
        -lg:px-[60px] -lg:pt-[80px]`,
        close: `absolute top-[40px] right-[60px]`,
        close_button: `bg-black rounded-md border-orange border-solid border-[1px] p-2 inline-flex items-center justify-center text-orange focus:outline-none \
        focus:ring-2 hover:ring-2 hover:ring-orange focus:ring-inset focus:ring-orange`,
        content_container: `w-full max-w-[650px] overflow-y-scroll scrollbar-hide -lg:pt-[40px]`,
        title: {
            main: `heading-4 text-orange normal-case text-center -sm:text-[25px]`,
            heading: ``,
        },
        form_container: {
            main: ``,
            form: `w-full mt-[40px] flex flex-col flex-wrap items-center`,
            input_container: `mb-[20px] -lg:w-full`,
            btn_container: `w-full flex justify-center mt-[10px]`,
            btn: `min-w-[160px] mb-[40px]`,
            error: `paragragh-3 block text-cyan`,
        },
        forgot_link: `paragraph-1 text-orange block mt-[40px] text-center`,
    }

    return (
        <div
            className={`register ${styles.main}`}
            >
            <div className={`content-container ${styles.content_container}`}>
                <div className={`title ${styles.title.main}`}>
                    <span className={`heading ${styles.title.heading}`}>
                        Login
                    </span>
                </div>

                <div className={`form-container ${styles.form_container.main}`}>
                    <form 
                        className={`form ${styles.form_container.form}`}
                        onSubmit={handleSubmit(onSubmit)}
                        >
                        <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="username">Username or Email Address:</label>
                            <input 
                                type="text" 
                                autoComplete="username"
                                placeholder="Username" 
                                id="username"
                                {...register('identifier', {
                                    required: true,
                                })} 
                            />
                        </div>

                        <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="password">Password:</label>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                id="password"
                                autoComplete="current-password"
                                {...register('password', {
                                    required: true,
                                })} 
                            />
                        </div>

                        <div className={`btn-container ${styles.form_container.btn_container}`}>
                            <button 
                                className={`btn btn-fill-orange ${styles.form_container.btn}`} 
                                type="submit" 
                                disabled={loggingIn}
                                >
                                {loggingIn ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>

                        <span className={styles.form_container.error}>{alert[1]}</span>
                    </form>

                    <div className={`social-logins ${styles.social_logins}`}>
                        <GoogleLogin />
                        <FacebookLogin />
                    </div>

                    <div className={`forgot-password`}>
                        <a className={styles.forgot_link} href="/user/forgotpassword">Forgot password?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}