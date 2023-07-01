import { useContext } from 'react'
import { ReactSVG } from "react-svg"
import Link from 'next/link'
import getConfig from "next/config"
import { getDynamicLink } from "@/hooks/getDynamicLink"
import Button from './partials/button'
import { motion } from 'framer-motion'
import { UserContext } from '../context/user'
import AccountHeader from './account/header'

export default function Header({ 
    links, 
    showForm, 
    setShowForm, 
    setShowMobileMenu, 
    showIsMenuOpen, 
    setShowIsMenuOpen 
    }) {

    const { publicRuntimeConfig } = getConfig()
    const { doLogout } = useContext(UserContext)
    const animation = { scale: 1.15 }

    const toggleHandler = (e) => {
        e.preventDefault()
        setShowIsMenuOpen(true)
        setShowMobileMenu(true)
    }

    const styles = {
        main: `header-container w-full sticky top-[0] z-20`,
        wrapper: `full relative left-[50%] translate-x-[-50%] flex justify-between items-center px-10 py-[10px] bg-orange`,
        logo: {
            main: `w-[125px] h-[78px]`,
            svg: `[&_path]:fill-black-100`,
        },
        menu: {
            main: `menu-left ml-[75px] hidden lg:block`,
            ul: `flex flex-row justify-center items-center h-full`,
            link: `text-black-100 font-din font-bold text-h5 tracking-h5 uppercase block px-[15px]`,
        },
        btn_container: {
            main: `flex-col justify-center hidden lg:flex`,
            button: `flex flex-col justify-center items-center h-full`,
        },
        menu_toggle: {
            main: `h-full p-2 rounded-[10px] bg-black lg:hidden \
            ${showIsMenuOpen ? 'space-y-1' : 'space-y-2'}`,
            block_1: `rounded-[10px] w-8 h-1 bg-orange`,
            block_2: `rounded-[10px] w-5 h-1 bg-orange`,
        }
    }

    return (
        <div className={`header-container ${styles.main}`}>
            <AccountHeader />

            <div className={`wrapper ${styles.wrapper}`}>
                <div className={`logo ${styles.logo.main}`}>
                    {links &&
                        <Link href="/">
                            <ReactSVG 
                                src={links.Logo.data.attributes.url}
                                className={styles.logo.svg} 
                            />
                        </Link>
                    }
                </div>

                <div className={`menu ${styles.menu.main}`}>
                    <ul className={styles.menu.ul}>
                        {links &&
                        links.menu_main.map((link) => (
                            <motion.li 
                                key={links.id}
                                whileHover={animation}
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
                        type='fill-black'
                        text='Schedule Training'
                        url='#'
                        isTrainingTrigger={true}
                        classes={styles.btn_container.button}
                        showForm={showForm} 
                        setShowForm={setShowForm}
                    />
                </div>

                <motion.div 
                    className={`menu-toggle ${styles.menu_toggle.main}`} 
                    onClick={(e) => toggleHandler(e)}
                    >
                    <span className={`block ${styles.menu_toggle.block_1}`}></span>
                    <span className={`block ${styles.menu_toggle.block_1}`}></span>
                    <span className={`block ${styles.menu_toggle.block_2}`}></span>
                </motion.div>
            </div>
        </div>
    )
}