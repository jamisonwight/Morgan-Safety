import getConfig from "next/config";
import Image from 'next/image'
import helmet from '../../assets/images/helmet.svg'

export default function Sponsors({ data, index }) {
    const { publicRuntimeConfig } = getConfig()

    const styles =  {
        main: `w-full bg-orange`,
        container: `relative left-[50%] translate-x-[-50%] flex justify-between px-10 sm:py-[0] px-10 max-w-[1440px]`,
        sponsors: {
            main: `flex flex-col flex-[50%] justify-center items-center px-[40px]`,
            content_container: `w-full flex flex-wrap justify-center items-end`,
            image: {
                main: `w-[50%] flex my-[30px]`,
                img: `w-full !h-[auto] !relative max-w-[180px] max-h-[125px] grayscale-[100%] brightness-[50%]`,
                link_url: `w-full h-[auto] inline-block relative`,
            },
        },
        content: {
            main: `flex flex-col items-center flex-[50%] lg:my-[100px]`,
            content_container: `w-[278px] flex flex-col justify-between items-center text-center`,
            logo: `w-[220px] h-[251px] self-center relative img-border-backdrop`,
            title: `heading-4-lg text-black`,
        },
    }

    return (
        <div className={`sponsors ${styles.main}`} id={`module-${index}`}>
            <div className={`container ${styles.container}`}>
                {data &&
                <div className={`sponsor-callouts ${styles.sponsors.main}`}>
                    <div className={`content-container ${styles.sponsors.content_container}`}>
                    {data.Sponsors &&
                        data.Sponsors.map((sponsor) => (
                            <div className={`image ${styles.sponsors.image.main}`}>
                                <a 
                                    href={sponsor.Link_URL}
                                    className={styles.sponsors.image.link_url} 
                                    target="_blank"
                                    
                                    >
                                    <Image
                                        src={`${publicRuntimeConfig.BASE_URL}${sponsor.Image_File.data.attributes.url}`} 
                                        alt="Sponsor Image"
                                        loading="lazy"
                                        className={`${styles.sponsors.image.img}`}
                                        fill
                                    />
                                </a>
                            </div>
                        ))
                    }
                    </div>
                </div>
                }

                <div className={`content ${styles.content.main}`}>
                    <div className={`content-container ${styles.content.content_container}`}>
                        <div className={`logo ${styles.content.logo}`}>
                            <Image
                                src={helmet} 
                                alt="Morgan Safety Services Helmet Logo"
                                loading="lazy"
                                fill
                            />
                        </div>

                        <span className={`title ${styles.content.title}`}>
                            {data.Title}
                        </span>
                    </div>
                </div>
            </div>  
        </div>
    )
}