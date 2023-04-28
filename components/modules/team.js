import getConfig from "next/config";
import Button from '../partials/button'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { useRef } from "react";
import { motion, useInView } from 'framer-motion'

export default function Team({ data, bios, showForm, setShowForm, index }) {
    const { publicRuntimeConfig } = getConfig()
    const bioRefs = useRef([])
    const bioIsInView = bioRefs.current.map(ref => useInView(ref, { amount: 0.3}));

    const bioAnimation = {
        start: { opacity: 0, scale: 0 },
        end: { opacity: 1, scale: 1 }
    }
    const tLineAnimation = {
        start: { scaleX: 0 },
        end: { scaleX: 1 }
    }

    const styles =  {
        main: `w-full tline after:tline-after tline-orange after:tline-orange-after bg-black-100 z-10`,
        container: `relative left-[50%] translate-x-[-50%] flex px-10 sm:py-[0] max-w-[1440px]`,
        title_content: {
            main: `flex flex-col flex-[50%] justify-center items-center lg:sticky lg:top-0 lg:h-[calc(100vh_+_97.5px)]`,
            content_container: ``,
            title: {
                main: `w-full flex mb-[10px]`,
                inner_title: `heading-4-lg !font-normal text-orange max-w-[286px]`,
            },
            description: `paragraph-3 text-orange pb-[30px] max-w-[300px]`,
            btn_container: `flex flex-wrap self-start`,
            button: `text-center max-w-[250px]`,
        },
        bios: {
            main: `flex flex-col items-center flex-[50%] tline-marker-parent lg:my-[100px]`,
            bio_item: `w-full flex justify-between mt-[150px] mb-[100px]`,
            tline_marker: `tline-marker-orange top-[190px]`,
            content: `w-[400px]`,
            profile: `w-[280px] h-[390px] self-center relative img-border-backdrop`,
            name: `heading-4 w-[326px] !leading-0 mt-[40px] text-orange block`,
            work_title: `heading-5 w-[326px] text-orange block my-[10px]`,
            description: `paragraph-3 w-[326px] text-orange block`,
        },
    }

    return (
        <div className={`team ${styles.main}`} id={`module-${index}`}>
            <div className={`container ${styles.container}`}>
                {data &&
                <div className={`title-content ${styles.title_content.main}`}>
                    <div className={`content-container ${styles.content_container}`}>
                        <div className={`title ${styles.title_content.title.main}`}>
                            <h1 className={`inner-title ${styles.title_content.title.inner_title}`}>
                                {data.Title}
                            </h1>
                        </div>

                        <div className={`description ${styles.title_content.description}`}>
                            <ReactMarkdown children={data.Description} escapeHtml={false} />
                        </div>

                        {data.Link.Text &&
                        <Button
                            key={data.Link.id} 
                            type={data.Link.Button_Type}
                            text={data.Link.Text}
                            url={data.Link.URL}
                            isTrainingTrigger={data.Link.Schedule_Training_Button}
                            classes={`${styles.title_content.button}`}
                            showForm={showForm}
                            setShowForm={setShowForm}
                            isMedia={data.Link.Is_Media}
                        />
                        }
                    </div>
                </div>
                }

                <div className={`bios ${styles.bios.main}`}>
                    {bios &&
                        bios.map((bio, index) => (
                            <div 
                                className={`bio-item ${styles.bios.bio_item}`}
                                key={bio.id}
                                ref={bioRefs[index]}
                                >
                                <motion.div
                                    className={`tline-marker ${styles.bios.tline_marker}`}
                                    initial={tLineAnimation.start}
                                    whileInView={bioIsInView ? tLineAnimation.end : {}}
                                    transition={{ duration: 0.5 }} 
                                    >
                                </motion.div>

                                <motion.div 
                                    className={`content ${styles.bios.content}`}
                                    initial={bioAnimation.start}
                                    whileInView={bioIsInView ? bioAnimation.end : {}}
                                    transition={{ type: "spring", duration: 1, bounce: 0.4, }}
                                    >
                                    <div className={`profile ${styles.bios.profile}`}>
                                        <Image
                                            src={`${publicRuntimeConfig.BASE_URL}${bio.Profile.data.attributes.url}`} 
                                            alt="Profile Bio Image"
                                            loading="lazy"
                                            fill
                                        />
                                        <div className="backdrop"></div>
                                    </div>

                                    <span className={`name ${styles.bios.name}`}>
                                        {bio.Name}
                                    </span>

                                    <span className={`work-title ${styles.bios.work_title}`}>
                                        {bio.Work_Title}
                                    </span>

                                    <div className={`description ${styles.bios.description}`}>
                                        <ReactMarkdown children={bio.Description} escapeHtml={false} />
                                    </div>
                                </motion.div>
                            </div>
                        ))
                    }
                </div>
            </div>  
        </div>
    )
}