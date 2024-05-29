import { useInitialRender } from "../hooks/useInitialRender"
import Link from 'next/link'

export default function MessageCallout({ pathName, message, btnText}) {
    
    const initialRender = useInitialRender()

    const styles = {
        main: `w-full h-full max-w-[660px] py-[100px] flex-col justify-center relative left-[50%] top-[50%]` + 
            ` translate-x-[-50%]`,
        heading: `heading-4 text-orange text-center mb-[40px] normal-case`,
        btn_default: `btn-default block`,
        btn_default_container: `w-full flex justify-center`,
    }

    if (!initialRender) return null

    return (
        <div className={`message-callout ${styles.main}`}>
            <h1 className={styles.heading}>{message}</h1>

            <div className={`btn-container ${styles.btn_default_container}`}>
                <Link 
                    className={styles.btn_default} 
                    href={pathName}
                    >
                    {btnText} &#10132;
                </Link>
            </div>
        </div>
    )
}





