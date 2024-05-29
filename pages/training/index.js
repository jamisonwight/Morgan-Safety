import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/user'
import { useRouter } from 'next/router'
import { message } from '../../utils/message'
import MessageCallout, { MesssageCallout } from '../../components/messageCallout'
import Link from 'next/link'
import getConfig from "next/config"
import { useInitialRender } from "../../hooks/useInitialRender"

export default function Training({ trainingCourses }) {

    const { user, paidUser, checkPaidUser, checkTrainingUser } = useContext(UserContext)
    const router = useRouter()
    const initialRender = useInitialRender()

    const styles = {
        main: `relative block w-full left-[50%] translate-x-[-50%] flex flex-col items-center px-10 min-h-[calc(100vh_-_270px)]` + 
            ` max-w-[100%] bg-cyan`,
        container: `h-full relative block flex flex-col`,
        heading: `w-full heading-1 text-black text-center mb-[20px]`,
        heading_denied: `heading-4 text-orange text-center mb-[40px] normal-case`,
        paragraph: `paragraph-1 text-center text-black`,
        btn: `relative top-[40px]`,
        courses: {
            main: `w-full py-[80px] flex flex-wrap justify-between`,
            course_item: `w-[calc(33.33%_-_20px)] border-solid border-[4px] border-orange-200 rounded-[108px] py-8 px-10 my-[30px] text-orange flex-col` + 
                ` bg-black justify-between hover:border-cyan hover:text-cyan hover:translate-y-[-10px] ease-in-out duration-300`,
            duration: `text-[13px] [&>span]:font-bold [&>span]:text-cyan [&>span]:italic`,
            course_info: {
                main: `flex justify-between items-center block w-full mb-[20px]`,
                content_left: `w-full`,
                content_right: `w-full flex justify-end`,
                h2: `heading-5 pl-[20px]`,
                item: `mx-[10px] heading-5 [&>span]:inline-block uppercase flex items-center [&>span]:bg-black [&>span]:w-[30px] [&>span]:h-[30px]` + 
                    ` [&>span]:rounded-[50%] [&>span]:mx-[10px] [&>span]:text-orange-100 [&>span]:flex-col [&>span]:justify-center [&>span]:text-center`,
                value: `relative top-[9px] text-[14px]`,
                hr: `w-full border-orange-100 border-[2px] mb-[40px]`
            },
            title_container: ``,
            title: `heading-4 text-[25px] normal-case mb-[5px]`,
            status: `w-full flex items-center justify-end mt-[20px]`,
            link: `flex items-center text-h3`,
            btn_default: `btn-default block`,
            btn_default_container: `w-full flex justify-center`,
        },
        access_denied: `w-full h-full py-[40px] flex-col justify-center`
    }

    useEffect(() => {
        if (user.confirmed) {
            checkPaidUser(user)
            checkTrainingUser(user)
        }
    }, [user, router])


    // Filter and sort the trainingCourses
    const filteredAndSortedCourses = trainingCourses.data
    .filter((course) => {
        // Check if the current user is in the list of users for each course
        return (
            !course.attributes.Completed_Users.data || // Check if `users` is undefined or falsy
            !course.attributes.Completed_Users.data.some((cUser) => cUser.id === user.id)
        )
    })
    .sort((a, b) => a.id - b.id); // Sort the remaining courses by id

    const courseHandler = (event, slug) => {
        event.preventDefault()
        router.push(`/training/${slug}`)
    }

    const getTotalCourses = () => {
        return filteredAndSortedCourses.length
    }

    let content = null; // Initialize content as null

    if (user?.paidUser || paidUser) {
        // If the user is paid, show courses
        content = (
            <div className={`courses ${styles.courses.main}`}>
                <h1 className={styles.heading}>Safety Courses</h1>

                <div className={`course-info ${styles.courses.course_info.main}`}>
                    <div className={`content-left ${styles.courses.course_info.content_left}`}>
                        <h2 className={styles.courses.course_info.h2}>
                            Hello {user.firstName} {user.lastName}!
                        </h2>
                    </div>

                    <div className={`content-right ${styles.courses.course_info.content_right}`}>
                        <div className={`completed ${styles.courses.course_info.item}`}>
                            Completed 
                            <span>
                                <div className={styles.courses.course_info.value}>0</div>
                            </span>
                        </div>
                        <div className={`Remaining ${styles.courses.course_info.item}`}>
                            Total 
                            <span>
                                <div className={styles.courses.course_info.value}>{getTotalCourses()}</div>
                            </span>
                        </div>
                    </div>
                </div>

                <hr className={`hr ${styles.courses.course_info.hr}`}></hr>

                {filteredAndSortedCourses &&
                    filteredAndSortedCourses.map((course) => (
                        <div 
                            className={`course-item ${styles.courses.course_item}`} 
                            key={course.attributes.Slug}
                            onClick={(e) => {courseHandler(e, course.attributes.Slug)}}
                            >
                            <div className={`title-container ${styles.courses.title_container}`}>
                                <div className={`title ${styles.courses.title}`}>{course.attributes.Title}</div>
                                <div className={`duration ${styles.courses.duration}`}>
                                    Duration: <span>{course.attributes.Course_Duration}</span>
                                </div>
                            </div>

                            <div className={`status ${styles.courses.status}`}>
                                <Link className={styles.courses.link} href={`/training/${course.attributes.Slug}`}>Start Course &#8594;</Link>
                            </div>
                        </div>
                    ))}
            </div>
        );
    } else {
        // Check each condition in order of preference
        if (!user.confirmed) {
            content = (
                <MessageCallout
                    pathName="/user/login"
                    message={message.training.accessDeniedUser}
                    btnText="Sign In"    
                />
            );
        } else {
            content = null
        }

        // else if (!user.first_name) {
        //     content = (
        //         <div className={`access-denied ${styles.access_denied}`}>
        //             <h1 className={styles.heading_denied}>{message.training.accessDeniedRegister}</h1>
        //             <div className={`register ${styles.courses.btn_default_container}`}>
        //                 <Link className={styles.courses.btn_default} href={`/training/register`}>Register Training &#10132;</Link>
        //             </div>
        //         </div>
        //     );
        // } else if (!user.paidUser) {
        //     content = (
        //         <div className={`access-denied ${styles.access_denied}`}>
        //             <h1 className={styles.heading_denied}>{message.training.accessDeniedPaid}</h1>
        //             <div className={`register ${styles.courses.btn_default_container}`}>
        //                 <Link className={styles.courses.btn_default} href={`/checkout`}>Checkout &#10132;</Link>
        //             </div>
        //         </div>
        //     );
        // }
    }

    return (
        <>
            <div className={`training ${styles.main}`}>
                <div className={`container ${styles.container}`}>
                    {content}
                </div>
            </div>
        </>
    )
}

export async function getStaticProps({ params }) {
    const { publicRuntimeConfig } = getConfig()

    // Get Bios from our API
    // Bios
    const trainingCourses_res = await fetch(publicRuntimeConfig.API_TRAINING_COURSES)
    const trainingCourses = await trainingCourses_res.json()

    return {
        props: { trainingCourses },
        revalidate: 60,
    } 
}