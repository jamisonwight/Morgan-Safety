import { useContext } from 'react';
import { UserContext } from '../../context/user';
import Button from '../partials/button'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { useRef } from "react";
import { motion, useInView } from 'framer-motion'

export default function Team({ data, bios, showForm, setShowForm, index }) {
    
    const { user } = useContext(UserContext)
    const bioRefs = useRef([])
    const bioIsInView = bioRefs.current.map(ref => useInView(ref, { amount: 0.3}));

    const animation = {
        bio: {
            start: { opacity: 0, scale: 0 },
            end: { opacity: 1, scale: 1 },
            transition: { duration: 0.5 },
        },
        tline: {
            start: { scaleX: 0 },
            end: { scaleX: 1 },
            transition: { type: "spring", duration: 1, bounce: 0.4, },
        }
    }

    const styles =  {
        main: `w-full tline after:tline-after tline-orange after:tline-orange-after bg-black-100 z-10`,
        container: `relative left-[50%] translate-x-[-50%] flex -lg:flex-col px-10 sm:py-[0] max-w-[1440px] z-20`,
        title_content: {
            main: `flex flex-col lg:flex-[50%] justify-center items-center ` +
                `lg:sticky lg:top-0 -lg:pt-[100px] -lg:bg-black -lg:pb-[60px] ` +
                `${user.confirmed ? 'lg:h-[calc(100vh_+_145px)]' : 'lg:h-[calc(100vh_+_97.5px)]'}`,
            content_container: `-lg:flex-col -lg:justify-center -lg:items-center`,
            title: {
                main: `w-full flex mb-[10px]`,
                inner_title: `w-full heading-4-lg !font-normal text-orange lg:max-w-[286px] -lg:text-center`,
            },
            description: `paragraph-3 text-orange pb-[30px] w-full max-w-[300px] -lg:text-center`,
            btn_container: `flex flex-wrap self-start -lg:items-center`,
            button: `text-center -lg:max-w-[250px] -lg:ml-[25px] lg:max-w-[250px]`,
        },
        bios: {
            main: `flex flex-col items-center lg:flex-[50%] tline-marker-parent lg:my-[100px]`,
            bio_item: `w-full flex justify-between -lg:justify-center  mt-[150px] mb-[100px] -lg:bg-black -lg:py-[60px]`,
            tline_marker: `tline-marker-orange top-[190px] -lg:hidden`,
            content: `lg:w-[400px] -lg:text-center`,
            profile: `w-[280px] h-[390px] self-center relative -lg:left-[50%] -lg:translate-x-[-50%] img-border-backdrop`,
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
                    <div className={`content-container ${styles.title_content.content_container}`}>
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
                                    initial={animation.tline.start}
                                    whileInView={bioIsInView ? animation.tline.end : {}}
                                    transition={animation.tline.transition} 
                                    >
                                </motion.div>

                                <motion.div 
                                    className={`content ${styles.bios.content}`}
                                    initial={animation.bio.start}
                                    whileInView={bioIsInView ? animation.bio.end : {}}
                                    transition={animation.bio.transition}
                                    >
                                    <div className={`profile ${styles.bios.profile}`}>
                                        <Image
                                            src={`${bio.Profile.data.attributes.url}`} 
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
                                        <ReactMarkdown children={bio.Description} escapeHtml={false}  />
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