import { useContext } from 'react'
import getConfig from "next/config"
import { UserContext } from '../../context/user'
import Link from 'next/link'
import Logout from '../partials/logout' 

export default function AccountHeader() {

    const { publicRuntimeConfig } = getConfig()
    const { user, email, doLogout } = useContext(UserContext)

    const styles = {
        main: `header-container w-full sticky top-[0] z-20 bg-dark dark:orange`,
        wrapper: `full relative left-[50%] translate-x-[-50%] flex justify-between items-center px-10 py-[10px]`,
        menu: {
            main: `menu-left ml-[75px] hidden lg:block`,
            ul: `flex flex-row justify-center items-center h-full`,
        },
        username: `flex`,
        link: `text-orange font-din text-h7 tracking-h7 uppercase block`,
        span: `text-cyan font-din font-bold text-h7 tracking-h7 uppercase block px-[5px]`,
    }

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
                            <li><Logout className={styles.link} /></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}