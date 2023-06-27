import { useContext } from 'react'
import getConfig from "next/config"
import { UserContext } from '../../context/user'
import Link from 'next/link'
import Logout from '../partials/logout' 

export default function AccountHeader() {

    const { publicRuntimeConfig } = getConfig()
    const { user, doLogout } = useContext(UserContext)

    const styles = {
        main: `header-container w-full sticky top-[0] z-20 bg-dark dark:orange`,
        wrapper: `full relative left-[50%] translate-x-[-50%] flex justify-between items-center px-10 py-[10px]`,
        menu: {
            main: `menu-left ml-[75px] hidden lg:block`,
            ul: `flex flex-row justify-center items-center h-full`,
        },
        link: `text-orange font-din font-bold text-h5 tracking-h5 uppercase block px-[15px]`,
    }

    return (
        <div className={`account-header-container ${styles.main}`}>
            <div className={`wrapper ${styles.wrapper}`}>
                <div className={`username ${styles.username}`}>
                    <Link href="/user" className={styles.link}>{user && user.username}</Link>
                </div>

                <div className={`menu ${styles.menu.main}`}>
                    <ul className={styles.menu.ul}>
                        <li><Logout /></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}