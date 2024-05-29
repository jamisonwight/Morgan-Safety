import { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { UserContext } from '../context/user'

export default function ResetPasswordConfirmForm() {
    
    const { setUser, doResetPasswordConfirm } = useContext(UserContext)
    const [ alert, setAlert]  = useState([])
    const [ showForm, setShowForm ] = useState(true)
    const [ isSubmitting, setSubmitting ] = useState()
    const router = useRouter()
    const { msg, code } = router.query
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
        setSubmitting(true)

        const _data = {
            code: code,
            password: values.password,
            repeatPassword: values.repeatPassword
        }

        const _return = await doResetPasswordConfirm(_data)

        if (_return[0] === 'alert') {
            setAlert(_return)
        } else {
            setShowForm(false)
            setAlert(['msg', _return])
        }
        setSubmitting(false)
    }

    const styles = {
        main: `w-full h-full relative left-[50%] translate-x-[-50%] flex justify-center py-[100px] max-w-[1440px] min-h-[600px] bg-black \
        flex-col justify-center items-center -lg:px-[60px] -lg:pt-[80px]`,
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
            btn: `min-w-[160px] mb-[10px]`,
            error: `paragragh-3 block text-cyan`,
        },
        forgot_link: `paragraph-1 text-orange block mt-[20px] text-center`,
        social_logins: `relative mt-[50px]`
    }

    useEffect(() => {
        setAlert(['msg', msg])
    }, [router])

    return (
        <div
            className={`reset-password-form ${styles.main}`}
            >
            <div className={`content-container ${styles.content_container}`}>
                {alert[1] && (
                    <span className={`alert-user alert-top ${styles.form_container.error}`}>{alert[1]}</span>
                )}

                {showForm && (
                <div className={`form-container ${styles.form_container.main}`}>
                    <div className={`title ${styles.title.main}`}>
                        <span className={`heading ${styles.title.heading}`}>
                            Password Reset Confirmation
                        </span>
                    </div>

                    <form 
                        className={`form ${styles.form_container.form}`}
                        onSubmit={handleSubmit(onSubmit)}
                        >
                        <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="password">Password:</label>
                            <input 
                                type="password" 
                                placeholder="New Password" 
                                id="password"
                                {...register('password', {
                                    required: 'You must specify a new password',
                                    minLength: { value: 8, message: 'At least 8 character' },
                                })} 
                            />
                            {errors.password && <span className={styles.form_container.error}>{errors.password.message}</span>}
                        </div>

                        <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="repeatPassword">Password Confirmation:</label>
                            <input 
                                type="password" 
                                placeholder="New Password Confirmation" 
                                id="repeatPassword"
                                {...register('repeatPassword', {
                                    required: 'You must confirm the new password',
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
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
                )}
            </div>
        </div>
    )
}