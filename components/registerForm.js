import { useState, useContext } from 'react'
import { useForm, reset } from 'react-hook-form'
import getConfig from "next/config"
import { UserContext } from '../context/user';

export default function RegisterForm() {
    
    const { publicRuntimeConfig } = getConfig()
    const { doRegister } = useContext(UserContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [alert, setAlert] = useState(['', ''])
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()
    const password = {}
    password.current = watch('password', '')

    const onSubmit = async (values) => {
        setIsSubmitting(true)

        const _return = await doRegister(values)

        if (_return[0] === 'alert') {
            setAlert(_return)
        } else {
            setAlert(_return)
            reset()
        }

        setIsSubmitting(false)
    }

    const styles = {
        main: `w-full h-full relative left-[50%] translate-x-[-50%] flex justify-center py-[100px] max-w-[1440px] bg-black \
        -lg:px-[60px] -lg:pt-[80px]`,
        close: `absolute top-[40px] right-[60px]`,
        close_button: `bg-black rounded-md border-orange border-solid border-[1px] p-2 inline-flex items-center justify-center text-orange focus:outline-none\
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
        }
    }

    return (
        <div
            className={`register ${styles.main}`}
            >
            <div className={`content-container ${styles.content_container}`}>
                <div className={`title ${styles.title.main}`}>
                    <span className={`heading ${styles.title.heading}`}>
                        Sign Up
                    </span>
                </div>

                <div className={`form-container ${styles.form_container.main}`}>
                    <form 
                        className={`form ${styles.form_container.form}`}
                        onSubmit={handleSubmit(onSubmit)}
                        >
                        <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="username">Username:</label>
                            <input 
                                type="text" 
                                placeholder="Username" 
                                id="username"
                                {...register('username', {
                                    required: 'Please choose a username',
                                })} 
                            />
                            {errors.username && <span className={styles.form_container.error}>{errors.username.message}</span>}
                        </div>

                        <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="email">Email:</label>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                id="email"
                                {...register('email', {
                                    required: 'Email address is required',
                                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                })} 
                            />
                            {errors.email && <span className={styles.form_container.error}>{errors.email.message}</span>}
                        </div>

                        <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="password">Password:</label>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                id="password"
                                {...register('password', {
                                    required: 'You must specify a password',
                                    minLength: { value: 8, message: 'At least 8 character' },
                                })} 
                            />
                            {errors.password && <span className={styles.form_container.error}>{errors.password.message}</span>}
                        </div>

                        <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="repeatPassword">Password Confirmation:</label>
                            <input 
                                type="password" 
                                placeholder="Password Confirmation" 
                                id="repeatPassword"
                                {...register('repeatPassword', {
                                    required: 'You must specify a password',
                                    validate: (value) =>
                                        value === password.current || 'The passwords do not match',
                                })} 
                            />
                            {errors.repeatPassword && <span className={styles.form_container.error}>{errors.repeatPassword.message}</span>}
                        </div>

                        <div className={`btn-container ${styles.form_container.btn_container}`}>
                            <button 
                                className={`btn btn-fill-orange ${styles.form_container.btn}`} 
                                type="submit" 
                                disabled={isSubmitting}
                                >
                                {isSubmitting ? 'Registering...' : 'Register Now'}
                            </button>
                        </div>

                        {alert[1]}
                    </form>
                </div>
            </div>
        </div>
    )
}