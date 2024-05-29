import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/user'
import { useInitialRender } from "../../hooks/useInitialRender"
import getConfig from "next/config";
import Link from 'next/link'

export default function TrainingIntro({ pageData: data }) {

    const { user, checkLogin, checkTrainingUser } = useContext(UserContext)
    const initialRender = useInitialRender()

    const styles = {
        main: `relative block w-full left-[50%] translate-x-[-50%] flex flex-col items-center px-10 min-h-[calc(100vh_-_270px)] max-w-[960px]`,
        container: `text-orange paragraph-2 text-orange py-[80px] [&>p]:pb-[20px]`,
        title: `text-h1 pb-[10px] font-bold`,
        subtitle: `text-h4 text-cyan font-bold pb-[10px]`,
        h3: `text-h6 uppercase text-cyan font-bold py-[10px]`,
        link: `btn btn-hollow-orange block`,
        btn_container: `w-full flex justify-between mt-[40px]`,
        btn: `px-[45px] py-[10px] border-orange border-[2px] rounded-[108px] block min-w-[160px] mb-[40px] !inline-block` + 
            ` hover:bg-orange hover:text-black`,
    }

    useEffect(() => {
        checkLogin()
        if (user.confirmed) checkTrainingUser(user)
    }, [user])

    if (!initialRender) return null

    return (
        <div>
            {/* Get training course data */}
            {user.confirmed && data &&
                <div className={`intro ${styles.main}`} key={data.id}>
                    <div className={`container ${styles.container}`}>
                        <h1 className={`title ${styles.title}`}>
                            {data.attributes.Title}
                        </h1>

                        <h2 className={`subtitle ${styles.subtitle}`}>
                            Important Notice: Please Read Before Proceeding
                        </h2>

                        <p>We're here to ensure your safety knowledge is top-notch and that you're equipped to 
                            navigate various scenarios with confidence. Before we begin, we need 
                            to inform you about a few crucial details regarding the course structure.</p>

                        <h3 className={styles.h3}>Course Duration and Browser</h3>

                        <p>You will be able to progress at your own pace, comprehending each topic 
                            thoroughly before moving forward. It's essential that you dedicate the necessary 
                            time to grasp the safety concepts effectively.</p>

                        <p>During this training, please refrain from closing your browser or navigating away 
                            from this page. Doing so will result in the interruption of your training progress, 
                            and you'll be required to start this section over. We understand that unexpected 
                            situations might arise, so make sure you have ample time to complete this segment 
                            without interruptions.</p>
                        
                        <p>The duration of this course is around <strong>{data.attributes.Course_Duration}.</strong></p>

                        <h3 className={styles.h3}>Course Completion Requirements</h3>

                        <p>Upon completing all the sections of this training, you'll be directed to a final 
                            assessment that must be passed before the course can be considered complete. This 
                            assessment is designed to evaluate your understanding of the safety concepts covered 
                            in the course.</p>

                        <p>Remember, the goal here is not just to rush through the material but to genuinely 
                            understand and internalize the safety information. Your safety and the safety of 
                            those around you are our top priorities.</p>

                        <h3 className={styles.h3}>Let's Get Started</h3>

                        <p>Now that you're aware of the unique structure of this training, let's dive right 
                            in. Click the "Continue" button below to begin enhancing your safety knowledge. 
                            Thank you for your commitment to safety, and we're excited to guide you through 
                            this essential learning experience!</p>

                        <p>If you have any technical difficulties or questions along the way, don't hesitate 
                            to reach out to call us at 1-432-242-1406 
                            or <a className="underline" href="mailto:msha.teach@gmail.com">
                                <strong>Email Us</strong></a> for support.</p>

                        <p>Click "Continue" to embark on this safety education journey!</p>

                        <div className={`continue ${styles.btn_container}`}>
                            <Link 
                                className={styles.btn} 
                                href={{
                                    pathname: '/training',
                                    query: {
                                        slug: data.attributes.Slug
                                    }
                                }}>
                                <span>&#8592; Back</span>
                            </Link>

                            <Link 
                                className={styles.btn} 
                                href={{
                                    pathname: '/training/video',
                                    query: {
                                        slug: data.attributes.Slug
                                    }
                                }}>
                                <span>Continue &#8594;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export async function getStaticPaths() {
    const { publicRuntimeConfig } = getConfig()

    // Get training courses from our API
    // Courses
    const courses_res = await fetch(publicRuntimeConfig.API_TRAINING_COURSES)
    const courses = await courses_res.json()

  // Get the paths we want to pre-render based on posts
    const paths = courses.data.map((course) => ({
        params: { slug: course.attributes.Slug},
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const { publicRuntimeConfig } = getConfig()

    // Get posts from our API
    // Courses
    const courses_res = await fetch(publicRuntimeConfig.API_TRAINING_COURSES)
    const courses = await courses_res.json()

    let pageData 

    courses.data.map((c) => {
        if (c.attributes.Slug === params.slug ) pageData = c
    })

    return {
        props: { pageData },
        revalidate: 60,
    } 
}