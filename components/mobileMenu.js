import { ReactSVG } from "react-svg"
import { motion } from 'framer-motion'
import getConfig from "next/config"
import { getDynamicLink } from "@/hooks/getDynamicLink"
import Button from './partials/button'
import logo from '../assets/images/logo.svg'

export default function MobileMenu({ 
    links, 
    showForm, 
    setShowForm, 
    setShowMobileMenu, 
    setShowIsMenuOpen 
    }) {

    const { publicRuntimeConfig } = getConfig()
    
    const animation = {
        start: {y: "100%"},
        end: {y: "0%"},
        duration: {duration: 1},
    }

    const closeHandler = (e) => {
        setShowMobileMenu(false)
        setShowIsMenuOpen(false)
    }

    const styles = {
        motion: `fixed bottom-0 left-0 right-0 h-[calc(100vh_-_120px)] z-[80]`,
        main: `w-full h-full relative left-[50%] translate-x-[-50%] flex justify-center py-[60px] max-w-[1440px] bg-black ` +
            `border-orange border-[1px] border-solid border-b-0 rounded-t-[108px]`,
        close: `absolute top-[40px] right-[60px]`,
        close_button: `bg-black rounded-md border-orange border-solid border-[1px] p-2 inline-flex items-center justify-center text-orange focus:outline-none ` +
            `focus:ring-2 hover:ring-2 hover:ring-orange focus:ring-inset focus:ring-orange`,
        content_container: `w-full max-w-[650px] overflow-y-scroll scrollbar-hide flex-col justify-center items-center text-center`,
        logo: {
            main: `w-full text-center mt-[40px]`,
            svg: `w-[200px] text-center [&_path]:fill-orange relative left-[50%] translate-x-[-50%]`,
        },
        menu: {
            main: `menu-left my-[40px]`,
            ul: `flex flex-col justify-center items-center h-full`,
            link: `text-orange font-din font-bold text-h5 !text-[25px] tracking-h5 uppercase block px-[15px] mb-[10px]`,
        },
        btn_container: {
            main: `w-full flex justify-center items-center`,
            button: `w-[250px] self-center`,
        },
    }

    return (
        <motion.div
            key="menu-modal"
            initial={animation.start}
            animate={animation.end}
            exit={animation.end}
            transition={animation.duration}
            className={styles.motion}
            >
            <div className={`container ${styles.main}`}>
                <div className={`close ${styles.close}`} onClick={closeHandler}>
                    <button type="button" className={styles.close_button}>
                        <span class="sr-only">Close menu</span>
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className={`content-container ${styles.content_container}`}>
                    <div className={`logo ${styles.logo.main}`}>
                    {links &&
                        <ReactSVG 
                            src={links.Logo.data.attributes.url}
                            className={styles.logo.svg} 
                        />
                    }
                    </div>

                    <div className={`menu ${styles.menu.main}`}>
                        <ul className={styles.menu.ul}>
                            {links &&
                            links.menu_main.map((link) => (
                                <motion.li 
                                    key={links.id}
                                    whileHover={animation}
                                    onClick={closeHandler}
                                    >
                                    {getDynamicLink(
                                        link.Text, 
                                        link.URL,
                                        styles.menu.link)
                                    }
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className={`btn-container ${styles.btn_container.main}`}>
                        <Button
                            type='fill-orange'
                            text='Schedule Training'
                            url='#'
                            isTrainingTrigger={true}
                            classes={styles.btn_container.button}
                            showForm={showForm} 
                            setShowForm={setShowForm}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}