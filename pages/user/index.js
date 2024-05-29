import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/user'
import { stringify } from 'postcss'

export default function User() {
    const { user } = useContext(UserContext)

    const styles = {
        main: `w-full h-full relative left-[50%] translate-x-[-50%] flex-col justify-center py-[60px] max-w-[1440px] bg-black`,
        title: `heading-5 uppercase text-orange block py-2 [&>span]:text-cyan [&>span]:!normal-case`,
    }

    return (
        <div className={`users`}>
            <div className={`container ${styles.main}`}>
            {user.firstName &&
                <div className={`title ${styles.title}`}>First Name: <span>{user.firstName}</span></div>
            }
            {user.lastName &&
                <div className={`title ${styles.title}`}>Last Name: <span>{user.lastName}</span></div>
            }
            {user.username &&
                <div className={`title ${styles.title}`}>Username: <span>{user.username}</span></div>
            }
            {user.email &&
                <div className={`title ${styles.title}`}>Email: <span>{user.email}</span></div>
            }
            {user.phoneNumber &&
                <div className={`title ${styles.title}`}>Phone Number: <span>{user.phoneNumber}</span></div>
            }
            {user.address &&
                <div className={`title ${styles.title}`}>Address: <span>{user.address}</span></div>
            }
            {user.city &&
                <div className={`title ${styles.title}`}>City: <span>{user.city}</span></div>
            }
            {user.state &&
                <div className={`title ${styles.title}`}>State: <span>{user.state}</span></div>
            }
            {user.zipcode &&
                <div className={`title ${styles.title}`}>Zipcode: <span>{user.zipcode}</span></div>
            }
            {user &&
                <div className={`title ${styles.title}`}>Paid User:  <span>{user.paidUser ? 'Yes' : 'No'}</span></div>
            }
            {user &&
                <div className={`title ${styles.title}`}>Completed Training: <span>{user.trainingComplete ? 'Yes' : 'No'}</span></div>
            }

            {user.confirmed &&
                <div className={`title ${styles.title}`}>Confirmed: <span>{user.confirmed ? 'Yes' : 'No'}</span></div>
            }
            </div>
        </div>
    )
}