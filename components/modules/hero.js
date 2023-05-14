import getConfig from "next/config";
import Button from '../partials/button'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export default function Hero({ data, showForm, setShowForm, index }) {
    
    const { publicRuntimeConfig } = getConfig()

    const styles =  {
        main: `tline after:tline-after tline-orange after:tline-orange-after w-full h-full bg-black z-10 flex overflow-hidden \
        -lg:min-h-[calc(100vh_-_100px)] lg:min-h-[100vh]`,
        container: `relative left-[50%] translate-x-[-50%] xs:flex-col lg:flex px-10 pb-[100px] h-full max-w-[1200px] z-20 \
        -lg:mt-[60px] -lg:bg-black lg:min-h-[100vh]`,
        content: `flex flex-[100%] lg:flex-[50%] justify-between items-center relative -lg:bg-black`,
        content_container: {
            main: `tline-marker-parent`,
            title: {
                main: `w-full flex -lg:items-center mb-[20px]`,
                inner_title: `heading-1 text-orange lg:max-w-[286px] mt-[20px]\ 
                -sm:text-[30px] ${data.Title_Image.data ? 'ml-[15px]' : ''}`,
                image: {
                    main: `flex`,
                    img: `-lg:max-w-[135px] max-w-[165px] self-start`,
                },
            },
            subtitle: `heading-3 text-cyan block pb-[10px]`,
            description: `paragraph-1 text-cyan pb-[30px] lg:max-w-[500px]`,
            btn_container: `flex flex-wrap self-start`,
            button: `flex m-[5px] -lg:mb-[10px]`,
            tline_marker: `tline-marker-orange top-[100px]`,
        },
        image: {
            main: `flex flex-[100%] lg:flex-[50%] justify-between -lg:justify-center items-center tline-marker-parent -md:hidden -lg:mt-[100px]`,
            tline_marker: `tline-marker-orange top-[50%] translate-y-[-50%] self-start flex-grow -lg:hidden`,
            img: `img-wide img-cyan -lg:w-[90%] -lg:h-[400px]`
        },
    }

    return (
        <div className={`hero ${styles.main}`} id={`module-${index}`}>
            {data &&
            <div className={`container ${styles.container}`}>
                <div className={`content ${styles.content}`}>
                    <div className={`content-container ${styles.content_container.main}`}>
                        <div className={`title ${styles.content_container.title.main}`}>
                            {data.Title_Image.data ? (
                                <div className={`image ${styles.content_container.title.image.main}`}>
                                    <img 
                                        src={`${publicRuntimeConfig.BASE_URL}${data.Title_Image.data.attributes.url}`} 
                                        alt="Hero Title Image" 
                                        className={`${styles.content_container.title.image.img}`}
                                        />
                                </div>
                            ) : null }
                            
                            <h1 className={`inner-title ${styles.content_container.title.inner_title}`}>
                                {data.Title}
                            </h1>
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
                                        classes={`${styles.content_container.button}`}
                                        showForm={showForm}
                                        setShowForm={setShowForm}
                                        isMedia={link.Is_Media}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    <div className={`tline-marker ${styles.content_container.tline_marker}`}></div>
                </div>

                <div className={`image ${styles.image.main}`}>
                    <div className={`tline-marker ${styles.image.tline_marker}`}></div>
                    
                    <div className={`img ${styles.image.img}`}>
                        <Image
                            src={`${publicRuntimeConfig.BASE_URL}${data.Image.data.attributes.url}`} 
                            alt="Hero Feature Image"
                            loading="lazy"
                            className="w-full object-cover"
                            fill 
                        />
                    </div>
                </div>
            </div>  
            }
        </div>
    )
}