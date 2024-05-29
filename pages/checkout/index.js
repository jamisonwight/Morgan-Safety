import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useInitialRender } from "../../hooks/useInitialRender"
import CheckoutForm from "../../components/checkoutForm"
import { UserContext } from '../../context/user'
import MessageCallout from '../../components/messageCallout'
import { message } from '../../utils/message'

const stripePromise = loadStripe("pk_test_51NVzLYISmtDOo3NfinGKJFa40kaVu7rqstmMnV2h4rjbarHEQlogiHIShSGW7206a5lghJJXsHUPz0RB09ud0rPO006qJqTXlH")

export default function Checkout() {

    const initialRender = useInitialRender()
    const { 
            user,
            paidUser, 
            checkTrainingRegister, 
            setIntentPurchase, 
            intentPurchase 
    } = useContext(UserContext)
    
    const router= useRouter()

    const styles = {
        main: `w-full h-full min-h-[calc(100vh_-_270px)]`,
        content_container: `w-full h-full`
    }

    useEffect(() => {
        setIntentPurchase(true)

        if (user.confirmed) {
            checkTrainingRegister()
        }
    }, [router, user])

    if (!initialRender) return null

    let content = null

    if (user.confirmed && !paidUser) {
        content = (
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        )
    } else if (paidUser) {
        content = null
    } else {
        content = (
            <MessageCallout 
                pathName="/user/login"
                message={message.checkout.accessDeniedUser}
                btnText="Sign In" 
            />
        );
    }

    return (
        <div className={`checkout ${styles.main}`}>
            <div className={`content-container ${styles.content_container}`}>
                {content}
            </div>
        </div>
    )
}





