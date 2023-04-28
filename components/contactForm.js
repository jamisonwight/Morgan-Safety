import { useRouter } from 'next/router';
import { useState } from 'react'
import { motion, AnimatePresence, useAnimation, useCycle } from 'framer-motion'
import getConfig from "next/config"
import axios from 'axios'
import validator from 'validator';

const { publicRuntimeConfig } = getConfig();

export default function ContactForm({ data, showForm, setShowForm }) {
    const router = useRouter();
    const [First_Name, setFirstName] = useState('')
    const [Last_Name, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [Phone_Number, setPhoneNumber] = useState('')
    const [Form_Type, setFormType] = useState('')
    const [Training_Type, setTrainingType] = useState('')
    const [Number_Of_People, setNumberOfPeople] = useState(0)
    const [Comments, setComments] = useState('')
    const [errors, setErrors] = useState({})

     const [isAnimating, setIsAnimating] = useState(false)
     const cycleAnimation = () => setIsAnimating(prev => !prev)
     const controls = useAnimation()

    const validateForm = () => {
        const formErrors = {}

        if (validator.isEmpty(First_Name)) {
            formErrors.First_Name = 'Please enter a first name'
        }
        if (validator.isEmpty(Last_Name)) {
            formErrors.Last_Name = 'Please enter a last name'
        }
        if (!validator.isEmail(Email)) {
            formErrors.Email = 'Please enter a valid email address'
        }
        if (!validator.isMobilePhone(Phone_Number, 'en-US')) {
            formErrors.Phone_Number = 'Please enter a valid phone number'
        }
        if (validator.isEmpty(Form_Type)) {
            formErrors.Form_Type = 'Please select type of form'
        }

         // If there are errors, update the state and don't submit the form
         if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
        }

        if (Object.keys(formErrors).length > 0) {
          throw formErrors
        }
    }

    const sendEmail = async () => {
        // Contact email to Admin
        try {
            await axios.post('/api/send-contact-email', {
                name: `${First_Name} ${Last_Name}`,
                email: Email,
                phoneNumber: Phone_Number,
                formType: Form_Type,
                trainingType: Training_Type,
                numberOfPeople: Number_Of_People,
                comments: Comments,
            });
            console.log('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
        }

        // Thank you email
        try {
            await axios.post('/api/contact-thank-you', {
                name: `${First_Name} ${Last_Name}`,
                email: Email,
                form_type: Form_Type,
            });
            console.log('Thank you email sent successfully!');
        } catch (error) {
            console.error('Error sending thank you email:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const formData = { 
            First_Name,
            Last_Name,
            Email,
            Phone_Number,
            Form_Type,
            Training_Type,
            Number_Of_People,
            Comments,
        }
        
        try {
            validateForm()
            const response = await fetch(`${publicRuntimeConfig.API_CONTACTS}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({data: formData})
            })
        
            if (response.ok) {
                // Handle success
                console.log('Form submitted successfully!')
                sendEmail()
                setShowForm(false)
                router.push('/thank-you');
            } else {
                // Handle errors
                console.error('Error submitting form:', response.statusText)
            }
        } catch (err) {
            console.error('Error submitting form:', err)
        }
    }

    const closeHandler = async () => {
        try {
            controls.start({ y: "100%" })
            setShowForm(false)
        } catch (e) {
            console.log("Error:", e)
        }
    }

    const styles = {
        motion: `fixed bottom-0 left-0 right-0 h-[calc(100vh_-_120px)] z-[100]`,
        main: `w-full h-full relative left-[50%] translate-x-[-50%] flex justify-center py-[60px] max-w-[1440px] bg-black\
        border-orange border-[1px] border-solid border-b-0 rounded-t-[108px]`,
        close: `absolute top-[40px] right-[60px]`,
        close_button: `bg-black rounded-md border-orange border-solid border-[1px] p-2 inline-flex items-center justify-center text-orange focus:outline-none\
        focus:ring-2 hover:ring-2 hover:ring-orange focus:ring-inset focus:ring-orange`,
        content_container: `w-full max-w-[650px] overflow-y-scroll scrollbar-hide`,
        title: {
            main: `heading-4 text-orange normal-case text-center`,
            heading: ``,
        },
        form_container: {
            main: ``,
            form: `w-full mt-[40px] flex flex-wrap justify-between`,
            input_container: `mb-[20px]`,
            btn_container: `w-full flex justify-center mt-[10px]`,
            btn: `min-w-[160px] mb-[40px]`,
            error: `paragragh-3 block text-cyan`,
        }
    }

    return (
        <motion.div
            key="modal"
            animate={{ y: "0%" }}
            initial={{ y: "100%" }}
            exit={{ y: "100%"}}
            transition={{ duration: 1 }}
            className={styles.motion}
            >
            <div className={`contact-form ${styles.main}`}>
                <div className={`close ${styles.close}`} onClick={closeHandler}>
                    <button type="button" className={styles.close_button}>
                        <span class="sr-only">Close menu</span>
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className={`content-container ${styles.content_container}`}>
                    <div className={`title ${styles.title.main}`}>
                        <span className={`heading ${styles.title.heading}`}>
                            Shedule Training / Contact Form
                        </span>
                    </div>

                    <div className={`form-container ${styles.form_container.main}`}>
                        <form 
                            className={`form ${styles.form_container.form}`}
                            onSubmit={handleSubmit}
                            >
                            <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                                <label className="sr-only" htmlFor="first_name">First Name:</label>
                                <input type="text" placeholder="First Name" id="first_name" value={First_Name} onChange={(e) => setFirstName(e.target.value)}/>
                                {errors.First_Name && <span className={styles.form_container.error}>{errors.First_Name}</span>}
                            </div>
                            <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                                <label className="sr-only" htmlFor="last_name">Last Name:</label>
                                <input type="text" placeholder="Last Name" id="last_name" value={Last_Name} onChange={(e) => setLastName(e.target.value)} />
                                {errors.Last_Name && <span className={styles.form_container.error}>{errors.Last_Name}</span>}
                            </div>
                            <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                                <label className="sr-only" htmlFor="email">Email:</label>
                                <input type="text" placeholder="Email" id="email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                                {errors.Email && <span className={styles.form_container.error}>{errors.Email}</span>}
                            </div>
                            <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                                <label className="sr-only" htmlFor="first_name">Phone Number:</label>
                                <input type="text" placeholder="Phone Number" id="phone_number" value={Phone_Number} onChange={(e) => setPhoneNumber(e.target.value)} />
                                {errors.Phone_Number && <span className={styles.form_container.error}>{errors.Phone_Number}</span>}
                            </div>
                            <div className={`input-container w-full ${styles.form_container.input_container}`}>
                                <label className="sr-only" htmlFor="form_type">Form Type:</label>
                                <select id="form_type" value={Form_Type} onChange={(e) => setFormType(e.target.value)}>
                                    <option disabled value="">-- Form Type --</option>
                                    <option value="Schedule Training">Schedule Training</option>
                                    <option value="Contact">Contact</option>
                                    <option value="Technical Support">Technical Support</option>
                                </select>
                                {errors.Form_Type && <span className={styles.form_container.error}>{errors.Form_Type}</span>}
                            </div>
                            {Form_Type == 'Schedule Training' ?
                            <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                                <label className="sr-only" htmlFor="training_type">Training Type:</label>
                                <select id="training_type" value={Training_Type} onChange={(e) => setTrainingType(e.target.value)}>
                                    <option disabled value="">-- Training Type --</option>
                                    <option value="Webinar Individual">Webinar (Individual)</option>
                                    <option value="Webinar (Group)">Webinar (Group)</option>
                                    <option value="On-Site Training">On-Site Training</option>
                                </select>
                            </div>
                            : null}
                            {Training_Type === 'Webinar (Group)' || Training_Type === 'On-Site Training' ?
                            <div className={`input-container lg:w-[calc(50%_-_10px)] ${styles.form_container.input_container}`}>
                                <label className="sr-only" htmlFor="first_name">Number Of People:</label>
                                <input type="number" placeholder="Group Count" id="number_of_people" onChange={(e) => setNumberOfPeople(e.target.value)} />
                            </div>
                            : null}
                            <div className={`input-container w-full ${styles.form_container.input_container}`}>
                                <label className="sr-only" htmlFor="comments">Comments:</label>
                                <textarea id="comments" placeholder="Comments" value={Comments} onChange={(e) => setComments(e.target.value)} />
                            </div>
                            <div className={`btn-container ${styles.form_container.btn_container}`}>
                                <button className={`btn btn-fill-orange ${styles.form_container.btn}`} type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}