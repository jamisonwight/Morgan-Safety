import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/user'
import Link from 'next/link'
import Logout from '../partials/logout' 

export default function AccountHeader() {

    const { user, checkLogin, paidUser, checkPaidUser } = useContext(UserContext)

    const styles = {
        main: `account-header-container w-full sticky top-[0] z-20`,
        wrapper: `full relative left-[50%] translate-x-[-50%] flex justify-between items-center px-10 py-[10px] bg-black`,
        menu: {
            main: `menu-left ml-[75px] hidden lg:block`,
            ul: `flex flex-row justify-center items-center h-full`,
        },
        username: `flex`,
        link: `text-cyan font-din text-h7 tracking-h2 uppercase block`,
        link_alt: `text-cyan heading-4 text-[18px] tracking-h3 block`,
        span: `text-orange font-din font-bold text-h7 tracking-h7 uppercase block px-[5px]`,
    }

    useEffect(() => {
        checkLogin()
        checkPaidUser(user)
    }, [])

    return (
        <div className={`account-header-container ${styles.main}`}>
            {user.confirmed && (
                <div className={`wrapper ${styles.wrapper}`}>
                    <div className={`username ${styles.username}`}>
                        <span className={styles.span}>User:</span>
                        <Link href="/user" className={styles.link}>{user.username}</Link>
                    </div>

                    <div className={`menu ${styles.menu.main}`}>
                        <ul className={styles.menu.ul}>
                            {!user.trainingComplete &&
                                <li><Link href="/training" className={styles.link_alt}>Training Courses &#10132;</Link></li>
                            }

                            {/* Need to add a state for training started but not complete */}

                            {/* Need to add a state for training complete */}
                            {/* {user.paidUser || paidUser && 
                                <li><Link href="/training" className={styles.link_alt}>Continue Training &#10132;</Link></li>
                            } */}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}