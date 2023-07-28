import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useInitialRender } from "../../hooks/useInitialRender"
import CheckoutForm from "../../components/checkoutForm"
import { UserContext } from '../../context/user'

const stripePromise = loadStripe("pk_test_51NVzLYISmtDOo3NfinGKJFa40kaVu7rqstmMnV2h4rjbarHEQlogiHIShSGW7206a5lghJJXsHUPz0RB09ud0rPO006qJqTXlH")

export default function Checkout() {

    const initialRender = useInitialRender()
    const { user, checkLogin, setIntentPurchase, intentPurchase } = useContext(UserContext)
    const router = useRouter()

    const styles = {
        main: `w-full h-full relative left-[50%] translate-x-[-50%] flex justify-center py-[100px] max-w-[1440px] bg-black ` +
            `-lg:px-[60px] -lg:pt-[80px]`,
        content_container: `w-full max-w-[650px] overflow-y-scroll scrollbar-hide -lg:pt-[40px]`,
        title: {
            main: `heading-4 text-orange normal-case text-center -sm:text-[25px]`,
            heading: ``,
        },
    }

    useEffect(() => {
        // User is set to be interested in training payment
        // This helps with redirects if user tries to checkout without being signed in
        setIntentPurchase(true)
    }, [])

    return (
        <div className={`checkout ${styles.main}`}>
            <div className={`content-container ${styles.content_container}`}>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    )
}