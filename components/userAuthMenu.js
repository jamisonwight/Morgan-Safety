import { useEffect, useContext } from 'react'
import Link from 'next/link'
import { UserContext } from '../context/user'

export default function UserAuthMenu() {

    const { user, doLogout } = useContext(UserContext)

    const styles = {
        main: `flex justify-center mt-[-6px] mb-[5px]`,
        ul: `flex justify-center items-center`,
        li: `mx-[10px] text-bold`,
        link: `heading-5 text-[16px]`
    }

    return (
        <div className={`user-auth-menu ${styles.main}`}>
                
                {!user.confirmed && 
                    <ul className={styles.ul}>
                        <li className={styles.li}>
                            <Link className={styles.link} href="/user/register">Register</Link>
                        </li>
                        <li className={styles.divider}>|</li>
                        <li className={styles.li}>
                            <Link className={styles.link} href="/user/login">Sign In</Link>
                        </li>
                    </ul>
                }
            
            {user.confirmed && 
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <Link className={styles.link} href="/user">Account</Link>
                    </li>
                    <li className={styles.divider}>|</li>
                    <li className={styles.li}>
                        <div className={styles.link} onClick={doLogout}>Sign Out</div>
                    </li>
                </ul>
            }
        </div>
    )
}