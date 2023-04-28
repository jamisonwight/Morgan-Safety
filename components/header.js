import { ReactSVG } from "react-svg";
import getConfig from "next/config";
import { getDynamicLink } from "@/hooks/getDynamicLink";
import Button from './partials/button'
import { motion } from 'framer-motion'
import {
    Link,
    Element,
    Events,
    animateScroll as scroll,
    scroller,
  } from "react-scroll"

export default function Header({ links, showForm, setShowForm }) {
    const { publicRuntimeConfig } = getConfig()
    const linkAnimation = {
        scale: 1.15,
    }

    return (
        <div className="header-container w-full sticky top-[0] z-20 bg-orange dark:orange">
            <div className="wrapper full relative left-[50%] translate-x-[-50%] flex justify-between px-10 py-[10px]">
                <div className="logo w-[125px] h-[78px]">
                    {links &&
                        <a href="/">
                            <ReactSVG 
                                src={publicRuntimeConfig.BASE_URL + links.Logo.data.attributes.url}
                                className="[&_path]:fill-black-100" 
                            />
                        </a>
                    }
                </div>

                <div className="menu menu-left ml-[75px]">
                    <ul className="flex flex-row justify-center items-center h-full">
                        {links &&
                        links.menu_main.map((link) => (
                            <motion.li 
                                key={links.id}
                                whileHover={linkAnimation}
                                >
                                {getDynamicLink(
                                    link.Text, 
                                    link.URL,
                                    `text-black-100 font-din font-bold text-h5 tracking-h5 uppercase block px-[15px]`)}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className="btn-container flex flex-col justify-center">
                    <Button
                        type='fill-black'
                        text='Schedule Training'
                        url='#'
                        isTrainingTrigger={true}
                        classes="flex flex-col justify-center items-center h-full"
                        showForm={showForm} 
                        setShowForm={setShowForm}
                    />
                </div>
            </div>
        </div>
    )
}