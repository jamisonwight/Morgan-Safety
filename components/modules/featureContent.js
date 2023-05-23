import getConfig from "next/config"
import Button from '../partials/button'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { useRef } from "react";
import { motion, useInView } from 'framer-motion'

export default function FeatureContent({ data, showForm, setShowForm, index }) {
    
    const { publicRuntimeConfig } = getConfig()
    const imageRef = useRef(null)
    const imageIsInView = useInView(imageRef, {amount: 0.3})

    const animation = {
        start: { opacity: 0, scale: 0 },
        end: { opacity: 1, scale: 1 },
        transition: {type: "spring", duration: 1, bounce: 0.4,},
    }

    const styles =  {
        main: `tline lg:after:tline-after tline-orange after:tline-orange-after w-full bg-black z-10 alt-order`,
        container: `w-full relative left-[50%] translate-x-[-50%] flex px-10 sm:py-[0] max-w-[100%]\
        -lg:flex-col`,
        image: {
            main: `flex flex-col flex-[50%] justify-center items-center tline-marker-parent`,
            content_wrap: `w-full flex flex-col justify-center items-center relative block\
            lg:sticky lg:top-[100px] lg:h-[calc(100vh_-_97.5px)] -lg:pt-[100px]`,
            img: `w-full img img-cyan order-item-2 -sm:!w-[calc(100%_-_20px)]`,
        },
        content: {
            main: `flex flex-col justify-center items-center flex-[50%] py-[80px] -lg:pt-[20px]`,
            content_container: `max-w-[500px]`,
            title: {
                main: `w-full flex justify-center mt-[30px] order-item-2`,
                inner_title: `heading-4-lg !font-normal text-orange`,
            },
            subtitle: `heading-3 text-orange block pb-[10px]`,
            copy: `paragraph-2 text-orange [&>p]:pb-[20px] -lg:text-center`,
            btn_container: `flex flex-wrap mt-[40px] -lg:justify-center`,
            button: `text-center max-w-[250px]`,
        },
    }

    return (
        <div className={`feature-content ${styles.main}`} id={`module-${index}`}>
            {data &&
            <div className={`container ${styles.container}`}>
                <div className={`image ${styles.image.main}`} ref={imageRef}>
                    <div className={`content-wrap ${styles.image.content_wrap}`}>
                        <motion.div
                            className={`img ${styles.image.img}`}
                            initial={animation.start}
                            whileInView={imageIsInView ? animation.end : {}}
                            transition={animation.transition}
                            >
                            <Image 
                                src={`${publicRuntimeConfig.BASE_URL}${data.Image.data.attributes.url}`} 
                                alt="Hero Feature Image"
                                loading="lazy"
                                className="object-cover"
                                fill 
                            />
                        </motion.div>

                        <div className={`title ${styles.content.title.main}`}>
                            <h1 className={`inner-title ${styles.content.title.inner_title}`}>
                                {data.Title}
                            </h1>
                        </div>
                    </div>
                </div>

                <div className={`content ${styles.content.main}`}>
                    <div className={styles.content.content_container}>
                        <span className={`subtitle ${styles.content.subtitle}`}>
                            {data.Subtitle}
                        </span>

                        <div className={`copy ${styles.content.copy}`}>
                            <ReactMarkdown children={data.Copy} escapeHtml={false} />
                        </div>

                        <div className={`btn-container ${styles.content.btn_container}`}>
                            {data.Links && 
                                data.Links.map((link) => (
                                    <Button
                                        key={link.id} 
                                        type={link.Button_Type}
                                        text={link.Text}
                                        url={link.URL}
                                        isTrainingTrigger={link.Schedule_Training_Button}
                                        classes={`${styles.content.button}`}
                                        showForm={showForm}
                                        setShowForm={setShowForm}
                                        isMedia={link.Is_Media}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>  
            }
        </div>
    )
}