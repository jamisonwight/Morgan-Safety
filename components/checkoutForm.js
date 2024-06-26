import { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { linstance } from '../lib/api'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useInitialRender } from "../hooks/useInitialRender"
import { UserContext } from '../context/user'

export default function CheckoutForm() {

    const { user, doPaidUser } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [alert, setAlert] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSucess, setIsSuccess] = useState(false)
    const initialRender = useInitialRender()
    const stripe = useStripe()
    const elements = useElements()
    const router = useRouter()
    const { msg } = router.query

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const options = {
        style: {
            iconStyle: 'solid',
            base: {
                padding: "8px 15px",
                fontSize: "18px",
                color: "#EE9B00",
            "::placeholder": {
                color: "#EE9B00",
            },
        },
            invalid: {
                color: "#EE9B00",
            },
        },
    }


    const styles = {
        main: `w-full h-full relative left-[50%] translate-x-[-50%] flex justify-center py-[0] max-w-[1440px] bg-black ` +
            `-lg:px-[60px]`,
        close: `absolute top-[40px] right-[60px]`,
        close_button: `bg-black rounded-md border-orange border-solid border-[1px] p-2 inline-flex items-center ` + 
            `justify-center text-orange focus:outline-none focus:ring-2 hover:ring-2 hover:ring-orange focus:ring-inset focus:ring-orange`,
        content_container: `w-full max-w-[650px] overflow-y-scroll scrollbar-hide py-[100px]`,
        title: {
            main: `w-full heading-2 text-orange normal-case text-center -sm:text-[25px]`,
            heading: ``,
        },
        form_container: {
            main: `w-full`,
            form: `w-full mt-[40px] flex flex-row flex-wrap justify-between items-between`,
            input_container: `mb-[20px] w-full`,
            btn_container: `w-full flex justify-center mt-[10px]`,
            btn: `min-w-[160px] !inline-block hover:text-black hover:bg-orange`,
            error: `paragragh-3 block text-cyan`,
            card_input: `w-full`,
            arrow: `inline-block pt-[5px]`
        },
        total: `bg-orange w-full heading-4 rounded-[108px] text-black normal-case text-center -sm:text-[25px] py-[20px] my-[40px]`,
    }

    useEffect(() => {
        setAlert(['msg', msg])
    }, [router])

    if (!initialRender) return null

    const totalHandler = (e) => {
        if (e.target.value === "New Miner") setTotal(32500); // 325.00 * 100 (cents)
        if (e.target.value === "Refresher") setTotal(12500); // 125.00 * 100 (cents)
    }

    const submitPayment = async (values) => {
        const cardElement = elements.getElement(CardElement)
        const token = await stripe.createToken(cardElement)

        if (token.error) {
            setAlert(['alert', token.error.message])
            return
        }

        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            state: user.state,
            address: user.address,
            city: user.city,
            zipcode: user.zipcode,
            amount: total,
            trainingType: values.trainingType,
            token: token.token.id,
        }
    
        try {  
            const resp = await linstance.post(`/api/training-payment`, data)
        } catch (error) {
            return ['alert', error.response.data.message]
        } finally {
            doPaidUser(user.id, true)
        }
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
                        Training Payment Checkout
                    </span>
                </div>

                <div className={`form-container ${styles.form_container.main}`}>
                    <form 
                        className={`form ${styles.form_container.form}`}
                        onSubmit={handleSubmit(submitPayment)}
                        >
                        
                        <div className={`input-container ${styles.form_container.input_container}`}>
                            <label className="sr-only" htmlFor="password">Select Training:</label>
                            <select 
                                type="text" 
                                id="trainingType"
                                {...register('trainingType', {
                                    required: 'You must select a training course',
                                })}
                                onChange={totalHandler} 
                                >
                                    <option value="" default selected disabled>Select Training</option>
                                    <option value="New Miner">New Miner Course</option>
                                    <option value="Refresher">Refresher Course</option>
                            </select>
                            {errors.trainingType && <span className={styles.form_container.error}>{errors.trainingType.message}</span>}
                        </div>

                        <div className={`input-container w-full] ${styles.form_container.card_input}`}>
                            <CardElement options={options} className="card-input" />
                        </div>

                        <div className={`total ${styles.total}`}>
                            <span className={`heading`}>
                                Total: ${(total / 100).toFixed(2)}
                            </span>
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