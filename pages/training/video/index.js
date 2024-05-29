import { useContext, useEffect, useState, useRef  } from 'react'
import { UserContext } from '../../../context/user'
import ReactPlayer from 'react-player/lazy'
import screenfull from 'screenfull'
import getConfig from "next/config"
import Link from 'next/link'
import helmet from '../../../assets/images/helmet.svg'
import { 
    AiFillCaretRight,
    AiOutlineExpand,
    AiOutlinePause
} from 'react-icons/ai'

export default function TrainingVideoIntro({ pageData: data }) {

    const player = useRef(null)
    const { user, checkLogin, checkTrainingUser } = useContext(UserContext)
    const [isPlaying, setIsPlaying] = useState()
    const [isFullscreen, setIsFullscreen] = useState()
    const [enableContinue, setEnableContinue] = useState()

    // Set custom poster class that uses psuedo classes to add backgrounds
    let videoPoster = (isPlaying) ? '' : 'video-play-btn'
    let continueButton = (enableContinue) ? 'btn-disable' : ''

    const styles = {
        main: `relative block w-full flex justify-center items-center px-10 bg-black -lg:flex-col`,
        content_container: `text-orange paragraph-2 text-orange py-[100px] lgpx-[40px] [&>p]:pb-[20px] max-w-[700px] text-center` + 
            ` -lg:py-[20px] -lg:pb-[80px] -lg:order-2`,
        video_container: `text-orange paragraph-2 text-orange py-[100px] lg:px-[40px] [&>p]:pb-[20px] max-w-[700px] text-center` + 
            ` -lg:pt-[80px] -lg:pb-[20px]`,
        title: `text-h1 leading-[1] font-bold`,
        subtitle: `text-h4 mt-[10px] leading-[1.1] text-cyan font-bold`,
        h3: `text-h6 uppercase text-cyan font-bold py-[10px]`,
        link: `btn btn-hollow-orange block`,
        btn_container: `w-full flex justify-center mt-[20px]`,
        btn: `${continueButton} px-[45px] py-[10px] border-orange border-[2px] rounded-[108px] block min-w-[160px] mt-[20px] mb-[40px] -lg:mb-[0] !inline-block` + 
            ` hover:bg-orange hover:text-black`,
        video_content: {
            main: `relative w-full flex flex-col justify-center items-center bg-black z-10`,
            container: `w-full flex flex-col justify-center items-center`,
            video: `${videoPoster} object-cover video-rounded border-orange border-[2px] rounded-[20px] relative w-full h-full overflow-hidden`,
            poster: `w-full h-full object-cover`,
        },
        custom_controls: {
            main: `flex justify-between rel-x-center bg-orange rounded-[0px] mt-[20px] text-black w-full py-1`,
            play: `text-[30px] h-full text-black mx-[20px] flex items-center`,
            pause: `text-[30px] h-full text-black mx-[20px] flex items-center`,
            expand: `text-[20px] heading-5 normal-case h-full text-black mx-[20px] flex items-center` + 
                ` [&>span]:inline-block [&>span]:mr-[10px]`,
        }
    }

    useEffect(() => {
        checkLogin()
        if (user.confirmed) checkTrainingUser(user)
    }, [])

    const playHandler = (event, isPlaying) => {
        event.preventDefault()
        setIsPlaying(isPlaying)
    }

    const fullscreenHandler = (event, isFullscreen) => {
        event.preventDefault()
        if (screenfull.isEnabled) {
            screenfull.request(player.current.wrapper);
        }
    }

    return (
        <div>
            {/* Get training course data */}
            {user.confirmed && data &&
                <div className={`video-intro ${styles.main}`} key={data.id}>
                    <div className={`container ${styles.content_container}`}>
                        <h1 className={`title ${styles.title}`}>
                            {data.attributes.Title}
                        </h1>
                        <h2 className={`title ${styles.subtitle}`}>
                            {data.attributes.Video_Title}
                        </h2>

                        <div className={`continue ${styles.btn_container}`}>
                            <Link 
                                className={styles.btn} 
                                href={{
                                    pathname: 'training/video/main',
                                    query: {
                                        slug: data.attributes.Slug
                                    }
                                }}>
                                <span>Take the Quiz &#10132;</span>
                            </Link>
                        </div>
                    </div>

                    <div className={`container ${styles.video_container}`}>
                        <div className={`video-content ${styles.video_content.main}}`}>
                            <div className={`container ${styles.video_content.container}`}>
                                <div 
                                    className={`video training-video ${styles.video_content.video}`}
                                    onClick={(e) => {playHandler(e, true)}}
                                    >
                                    
                                    <div className={`overlay`}></div>

                                    <ReactPlayer
                                        ref={player}
                                        url={`${data.attributes.Intro_Video.data.attributes.url}`}
                                        width="100%"
                                        height="100%"
                                        controls={false}
                                        playing={isPlaying}
                                        pip={isFullscreen}
                                    />

                                </div>
                            </div>
                        </div>

                        <div className={`custom-controls ${styles.custom_controls.main}`}>
                            <div className={`content-left ${styles.custom_controls.content_left}`}>
                                {!isPlaying &&
                                    <div 
                                        className={`play ${styles.custom_controls.play}`}
                                        onClick={(e) => {playHandler(e, true)}}
                                        >
                                        <AiFillCaretRight />
                                    </div>
                                }
                                {isPlaying &&
                                    <div 
                                        className={`pause ${styles.custom_controls.pause}`}
                                        onClick={(e) => {playHandler(e, false)}}
                                        >
                                        <AiOutlinePause />
                                    </div>
                                }
                            </div>

                            <div className={`content-right ${styles.custom_controls.content_right}`}>
                                <div 
                                    className={`expand ${styles.custom_controls.expand}`}
                                    onClick={(e) => {fullscreenHandler(e, true)}}
                                    >
                                    <span>Fullscreen</span> <AiOutlineExpand />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                
            }
        </div>
    )
}

export async function getServerSideProps(context) {
    const { publicRuntimeConfig } = getConfig()
    const { slug } = context.query

    // Fetch data based on the ID
    
    // Get posts from our API
    // Courses
    const courses_res = await fetch(publicRuntimeConfig.API_TRAINING_COURSES)
    const courses = await courses_res.json()

    let pageData

    courses.data.map((c) => {
        if (c.attributes.Slug === slug ) pageData = c
    })
    
    return {
        props: { 
            pageData,
            revalidate: 60
        }
    }
}