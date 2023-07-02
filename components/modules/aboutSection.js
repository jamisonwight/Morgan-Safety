import getConfig from "next/config"
import Button from '../partials/button'
import Image from 'next/image'
import logo from '../../assets/images/logo.svg'
import ReactPlayer from 'react-player/lazy'
import ReactMarkdown from 'react-markdown'
import { useRef, useState } from "react"
import { motion, useInView, useScroll, useSpring } from 'framer-motion'

export default function aboutSection({ data, showForm, setShowForm, index }) {
    
    const { publicRuntimeConfig } = getConfig()
    const imageRef = useRef(null)
    const imageIsInView = useInView(imageRef, {amount: 0.3})
    const contentRefs = useRef([])
    const contentIsInView = contentRefs.current.map(ref => useInView(ref, { amount: 0.6, once: true }))
    const contentItemRefs = useRef([])
    const contentItemIsInView = contentItemRefs.current.map(ref => useInView(ref, { amount: 0.6, once: true}))
    const [isPlaying, setIsPlaying] = useState(false)

    const contentAnimation = {
        start: { opacity: 0, scale: 0.5 },
        end: { opacity: 1, scale: 1 }
    }

    const styles = {
        main: `lg:tline after:tline-after tline-black after:tline-black-after w-full bg-cyan`,
        container: `relative w-full left-[50%] translate-x-[-50%] flex flex-col px-10 py-[100px] max-w-[1023px] z-10`,
        logo: {
            main: `relative w-full flex items-center justify-center items-center py-[20px] mb-[60px] bg-cyan`,
            img: `object-contain order-item-1 bg-cyan`,
        },
        content: `flex w-[50%] -lg:w-full items-center justify-between relative order-item-1`,
        content_container: {
            main: `tline-marker-parent lg:max-w-[400px] order-item-2 mb-[40px]`,
            title: {
                main: `w-full flex text-black`,
                inner_title: `heading-4-lg uppercase text-black lg:max-w-[400px] -lg:w-full`,
            },
            subtitle: `heading-3 text-black block pb-[5px]`,
            description: `paragraph-1 text-black pb-[20px] max-w-[400px]`,
            btn_container: `flex flex-wrap self-start`,
            tline_marker: `tline-marker-black top-[0px] order-item-1`
        },
        content_details: {
            main: `w-full relative flex flex-wrap`,
            content_item: `relative flex w-[50%] -lg:w-full items-center justify-between relative alt-order lg:even:top-[100px] mb-[100px] \
            -lg:mb-[60px] -lg:odd:text-right -lg:odd:pl-[20%] -lg:even:pr-[20%]`,
            content_container: {
                main: `tline-marker-parent lg:max-w-[400px] flex-col order-item-2`,
                title: {
                    main: `w-full flex text-black`,
                    inner_title: `heading-4 block text-black lg:max-w-[400px] -lg:w-full`,
                },
                subtitle: `heading-3 text-black block pb-[5px]`,
                description: `paragraph-2 text-black  lg:max-w-[400px]`,
                btn_container: `flex flex-wrap self-start`,
            },
            tline_marker: `tline-marker-black top-[0px] order-item-1`,
            cta_button: `!inline-flex mt-[20px]`,
        },
        video_content: {
            main: `relative w-full flex flex-col justify-center items-center mt-[80px] py-[20px] -lg:px-[20px] bg-cyan z-10`,
            container: `w-full flex flex-col justify-center items-center`,
            video: `video-rounded relative w-[600px] h-[400px] overflow-hidden -lg:w-full -lg:h-full`,
            poster: `w-full h-full object-cover`,
            content: `pt-[40px] text-center`,
            title: `heading-4 text-black block mb-[5px]`,
            description: `prose paragraph-3 text-black`,
        }   
    }

    const handlePlayClick = () => {
        setIsPlaying(true)
    }

    return (
        <div className={`about-section ${styles.main}`} id={`module-${index}`}>
            {data &&
            <div className={`container ${styles.container}`}>
                {data.Show_Logo &&
                    <div className={`logo ${styles.logo.main}`}>
                        <Image 
                            src={logo} 
                            alt="Morgan Safety Services Logo"
                            loading="lazy"
                            className={`${styles.logo.img}`}
                            width={453}
                            height={286}
                        />
                    </div>
                }

                <motion.div 
                    className={`content ${styles.content}`}
                    ref={contentItemRefs[0]}
                    initial={contentAnimation.start}
                    whileInView={contentItemIsInView ? contentAnimation.end : {}}
                    transition={{ duration: 1}}
                    >
                    <div className={`content-container ${styles.content_container.main}`}>
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
                    </div>
                    
                    <div className={`tline-marker ${styles.content_container.tline_marker}`}></div>
                </motion.div>

                <div className={`content-details ${styles.content_details.main}`}>
                    {data.Text_Section && 
                        data.Text_Section.map((item, index) => (
                            <motion.div
                                className={`content-item ${styles.content_details.content_item}`}
                                key={item.id}
                                ref={contentItemRefs[index]}
                                initial={contentAnimation.start}
                                whileInView={contentItemIsInView ? contentAnimation.end : {}}
                                transition={{ duration: 1}}
                                >
                                <div className={`content-container ${styles.content_details.content_container.main}`}>
                                    <div className={`title ${styles.content_details.content_container.title.main}`}>
                                        <span className={`inner-title ${styles.content_details.content_container.title.inner_title}`}>
                                            {item.Title}
                                        </span>
                                    </div>

                                    <span className={`subtitle ${styles.content_details.content_container.subtitle}`}>
                                        {item.Subtitle}
                                    </span>

                                    <div className={`description ${styles.content_details.content_container.description}`}>
                                        <ReactMarkdown children={item.Description} escapeHtml={false} />
                                    </div>
                                </div>

                                <div className={`tline-marker ${styles.content_details.tline_marker}`}></div>
                            </motion.div>
                        ))
                    }

                    {/* CTA Button */}
                    <motion.div
                        className={`content-item ${styles.content_details.content_item}`}
                        ref={contentItemRefs[1]}
                        initial={contentAnimation.start}
                        whileInView={contentItemIsInView ? contentAnimation.end : {}}
                        transition={{ duration: 1}} 
                        >
                        <div className={`content-container ${styles.content_details.content_container.main}`}>
                            <div className={`title ${styles.content_details.content_container.title.main}`}>
                                <span className={`inner-title ${styles.content_details.content_container.title.inner_title}`}>
                                    {data.Link.Heading_Title}
                                </span>
                            </div>

                            <Button
                                key={data.Link.id} 
                                type={data.Link.Button_Type}
                                text={data.Link.Text}
                                url={data.Link.URL}
                                isTrainingTrigger={data.Link.Schedule_Training_Button}
                                classes={styles.content_details.cta_button}
                                showForm={showForm}
                                setShowForm={setShowForm}
                            />
                        </div>

                        <div className={`tline-marker ${styles.content_details.tline_marker}`}></div>
                    </motion.div>
                </div>

                {data.Video_File.data.attributes.name &&
                <div className={`video-content ${styles.video_content.main}}`}>
                    <div className={`container ${styles.video_content.container}`}>
                        <div className={`video ${styles.video_content.video}`}>
                            <ReactPlayer 
                                url={`${data.Video_File.data.attributes.url}`}
                                light={<img 
                                    src={`${data.Video_Image.data.attributes.url}`} 
                                    alt={`${data.Video_File.data.attributes.name}`} 
                                    className={styles.video_content.poster} />}
                                width="100%"
                                height="100%"
                                controls
                                playing
                            />
                        </div>

                        <div className={`content ${styles.video_content.content}`}>
                            <span className={`title ${styles.video_content.title}`}>
                                {data.Video_Title}
                            </span>

                            <div className={`description ${styles.video_content.description}`}>
                                <ReactMarkdown children={data.Video_Description} escapeHtml={false} />
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>  
            }
        </div>
    )
}