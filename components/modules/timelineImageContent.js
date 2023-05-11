import getConfig from "next/config";
import { mqMaxLarge } from "../../hooks/utils";
import Button from '../partials/button'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { useRef } from "react";
import { motion, useInView } from 'framer-motion'

export default function timelineImageContent({ data, showForm, setShowForm, index }) {
    
    const { publicRuntimeConfig } = getConfig();
    const imageRef = useRef(null)
    const imageIsInView = useInView(imageRef, {amount: 0.3})
    const contentRef = useRef(null)
    const contentIsInView = useInView(contentRef, {amount: 0.6})
    
    const animation = {
        image: {
            start: { opacity: 0, scale: 0, y: (mqMaxLarge) ? 50 : 0 },
            end: { opacity: 1, scale: 1, y: 0 },
            transition: { type: "spring", duration: 1, bounce: 0.4, },
        },
        content: {
            start: { opacity: 0, y: (mqMaxLarge) ? 50 : 0 },
            end: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
        },
        tline: {
            start: { scaleX: 0 },
            end: { scaleX: 1 },
            transition: { duration: 0.5 },
        },
    }

    const styles = {
        main: `tline after:tline-after tline-orange after:tline-orange-after w-full alt-order alt-color \
        -lg:py-[100px] -lg:bg-black -lg:overflow-x-hidden z-10`,
        container: `relative block w-full left-[50%] translate-x-[-50%] flex -lg:flex-col justify-between px-10 max-w-[1200px] z-10 \
        -lg:bg-black before-padding`,
        image: {
            main: `lg:flex-[50%] relative justify-between items-center tline-marker-parent order-item-1 -lg:!order-1`,
            content_wrap: `w-full flex justify-between -lg:justify-center items-center relative order-item-2\ 
            lg:h-[calc(100vh_-_97.5px)] lg:sticky lg:top-[100px]`,
            tline_marker: `tline-marker-orange order-item-2 -lg:hidden`,
            img: `w-full h-full img img-cyan object-cover order-item-1`,
        },
        content: `flex flex-wrap lg:flex-[50%] relative order-item-2`,
        scroller: `block relative lg:h-[150vh]`,
        content_wrap: `w-full flex justify-between -lg:justify-center items-center relative order-item-2 \
        -lg:!order-2 -lg:z-20`,
        content_container: {
            main: `tline-marker-parent w-full max-w-[328px] order-item-2 -lg:flex-col justify-center items-center \
            -lg:bg-black -lg:py-[20px] -lg:my-[40px]`,
            title: {
                main: `w-full flex -lg:justify-center`,
                inner_title: `heading-4 text-orange max-w-[256px] -lg:text-center`,
            },
            subtitle: `heading-3 text-cyan block pb-[10px] -lg:text-center`,
            description: `paragraph-3 text-cyan pb-[20px] -lg:text-center`,
            btn_container: `flex flex-wrap self-start -lg:justify-center`,
            tline_marker: `tline-marker-orange top-[0px] order-item-1 -lg:hidden`
        },   
    }

    return (
        <div className={`timeline-image-content ${styles.main}`} id={`module-${index}`}>
            {data &&
            <div className={`container ${styles.container}`}>
                <div className={`image ${styles.image.main}`} ref={imageRef}>
                    <div className={`content-wrap ${styles.image.content_wrap}`}>
                        <motion.div
                            className={`img ${styles.image.img}`}
                            initial={animation.image.start}
                            whileInView={imageIsInView ? animation.image.end : {}}
                            transition={animation.image.transition}
                            >
                            <Image 
                                src={`${publicRuntimeConfig.BASE_URL}${data.Image.data.attributes.url}`} 
                                alt="Hero Feature Image"
                                loading="lazy"
                                className="object-cover"
                                fill cx
                            />
                        </motion.div>

                        <motion.div
                            className={`tline-marker ${styles.image.tline_marker}`}
                            initial={animation.tline.start}
                            whileInView={imageIsInView ? animation.tline.end : {}}
                            transition={animation.tline.transition}
                            >
                        </motion.div>
                    </div>
                </div>

                <div className={`content ${styles.content}`} ref={contentRef}>
                    <div className={`scroller ${styles.scroller}`}></div>

                    <div className={`content-wrap ${styles.content_wrap}`}>
                        <motion.div
                            className={`tline-marker ${styles.content_container.tline_marker}`}
                            initial={animation.tline.start}
                            whileInView={contentIsInView ? animation.tline.end : {}}
                            transition={animation.tline.transition}
                            >
                        </motion.div>
                        
                        <motion.div
                            className={`content-container ${styles.content_container.main}`}
                            initial={animation.content.start}
                            whileInView={contentIsInView ? animation.content.end : {}}
                            transition={animation.content.transition}
                            >
                            <div className={`title ${styles.content_container.title.main}`}>
                                <span className={`inner-title ${styles.content_container.title.inner_title}`}>
                                    {data.Title}
                                </span>
                            </div>

                            <span className={`subtitle ${styles.content_container.subtitle}`}>
                                {data.Subtitle}
                            </span>

                            <div className={`description ${styles.content_container.description}`}>
                                <ReactMarkdown children={data.Description} escapeHtml={false} />
                            </div>

                            <div className={`btn-container ${styles.content_container.btn_container}`}>
                                {data.Links &&
                                    data.Links.map((link) => (
                                        <Button
                                            key={link.id} 
                                            type={link.Button_Type}
                                            text={link.Text}
                                            url={link.URL}
                                            isTrainingTrigger={link.Schedule_Training_Button}
                                            showForm={showForm}
                                            setShowForm={setShowForm}
                                            isMedia={link.Is_Media}
                                        />
                                    ))
                                }
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>  
            }
        </div>
    )
}