import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/user'
import { stringify } from 'postcss'

export default function User() {
    const { user, email, checkLogin } = useContext(UserContext)

    const styles = {
        main: `w-full h-full relative left-[50%] translate-x-[-50%] flex justify-center py-[60px] max-w-[1440px] bg-black`,
        title: `heading-1 text-orange`,
    }

    useEffect(() => {
        checkLogin()
    }, [])

    return (
        <div className={`users`}>
            <div className={`container ${styles.main}`}>
                <div className={`title ${styles.title}`}>Welcome {user.confirmed && (email)}!</div>
            </div>
        </div>
    )
}