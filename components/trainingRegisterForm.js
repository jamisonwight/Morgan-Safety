import { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { linstance } from '../lib/api'
import { useInitialRender } from "../hooks/useInitialRender"
import { UserContext } from '../context/user'

export default function TrainingRegisterForm() {

    const { user, doRegisterTraining } = useContext(UserContext)
    const [alert, setAlert] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const initialRender = useInitialRender()
    const router = useRouter()
    const { msg } = router.query

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const styles = {
        main: `w-full h-full relative left-[50%] translate-x-[-50%] flex justify-center py-[0] max-w-[1440px] bg-black ` +
            `-lg:px-[60px] -lg:pt-[80px]`,
        content_container: `w-full max-w-[650px] overflow-y-scroll scrollbar-hide py-[80px] -lg:pt-[40px]`,
        title: {
            main: `w-full heading-2 text-orange normal-case text-center -sm:text-[25px]`,
            heading: ``,
        },
        form_container: {
            main: `w-full`,
            form: `w-full mt-[40px] flex flex-row flex-wrap justify-between items-between`,
            input_container: `mb-[20px] -lg:w-full`,
            btn_container: `w-full flex justify-center mt-[10px]`,
            btn: `mt-[40px] !inline-block hover:text-black hover:bg-orange`,
            error: `paragragh-3 block text-cyan`,
            card_input: `w-full`,
            arrow: `inline-block pt-[5px]`
        },
    }

    useEffect(() => {
        setAlert(['msg', msg])
    }, [router])

    if (!initialRender) return null

    const submitPayment = async (values) => {
        const data = {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            state: values.state,
            address: values.address,
            city: values.city,
            zipcode: values.zipcode,
        }
    
        doRegisterTraining(user.id, data)
    }

    return (
        <div
            className={`checkout-form ${styles.main}`}
            >
            <div className={`content-container ${styles.content_container}`}>
                {alert[1] && (
                    <span className={`alert-user alert-top ${styles.form_container.error}`}>{alert[1]}</span>
                )}

                <div className={`title ${styles.title.main}`}>
                    <span className={`heading ${styles.title.heading}`}>
                        Register Training
                    </span>
                </div>

                <div className={`form-container ${styles.form_container.main}`}>
                    <form 
                        className={`form ${styles.form_container.form}`}
                        onSubmit={handleSubmit(submitPayment)}
                        >
                        <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="firstName">First Name:</label>
                            <input 
                                type="text" 
                                placeholder="First Name" 
                                id="firstName"
                                {...register('firstName', {
                                    required: 'First name is required',
                                })} 
                            />
                            {errors.firstName && <span className={styles.form_container.error}>{errors.address.message}</span>}
                        </div>

                        <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="city">Last Name:</label>
                            <input 
                                type="text" 
                                placeholder="Last Name" 
                                id="lastName"
                                {...register('lastName', {
                                    required: 'Last name is required',
                                })} 
                            />
                            {errors.lastName && <span className={styles.form_container.error}>{errors.city.message}</span>}
                        </div>

                        <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="password">Phone Number:</label>
                            <input 
                                type="text" 
                                placeholder="Phone Number" 
                                id="phoneNumber"
                                {...register('phoneNumber', {
                                    required: 'Phone Number is required',
                                })} 
                            />
                            {errors.state && <span className={styles.form_container.error}>{errors.state.message}</span>}
                        </div>

                        <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="address">Address:</label>
                            <input 
                                type="text" 
                                placeholder="Address" 
                                id="address"
                                {...register('address', {
                                    required: 'Address is required',
                                })} 
                            />
                            {errors.address && <span className={styles.form_container.error}>{errors.address.message}</span>}
                        </div>

                        <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="city">City:</label>
                            <input 
                                type="text" 
                                placeholder="City" 
                                id="city"
                                {...register('city', {
                                    required: 'You must specify a city',
                                })} 
                            />
                            {errors.city && <span className={styles.form_container.error}>{errors.city.message}</span>}
                        </div>

                        <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="password">State:</label>
                            <input 
                                type="text" 
                                placeholder="State" 
                                id="state"
                                {...register('state', {
                                    required: 'You must specify a state',
                                })} 
                            />
                            {errors.state && <span className={styles.form_container.error}>{errors.state.message}</span>}
                        </div>

                        <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="password">Zipcode:</label>
                            <input 
                                type="number" 
                                placeholder="Zipcode" 
                                id="zipcode"
                                {...register('zipcode', {
                                    required: 'Zipcode is required',
                                })} 
                            />
                            {errors.state && <span className={styles.form_container.error}>{errors.state.message}</span>}
                        </div>

                        <div className={`btn-container ${styles.form_container.btn_container}`}>
                            <button 
                                className={`btn btn-hollow-orange ${styles.form_container.btn}`} 
                                type="submit" 
                                disabled={isSubmitting}
                                >
                                <span className={styles.form_container.arrow}>
                                    {isSubmitting ? 'Submitting...' : 'Continue '}
                                </span>

                                {/* arrow */}
                                {!isSubmitting && <span className={styles.form_container.arrow}>&#8594;</span>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}