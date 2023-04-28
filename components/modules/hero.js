import getConfig from "next/config";
import Button from '../partials/button'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export default function Hero({ data, showForm, setShowForm, index }) {
    const { publicRuntimeConfig } = getConfig();

    const styles =  {
        main: `tline after:tline-after tline-orange after:tline-orange-after w-full lg:h-[100vh] bg-black z-10`,
        container: `relative left-[50%] translate-x-[-50%] flex px-10 py-[150px] max-w-[1200px]`,
        content: `flex flex-[50%] justify-between`,
        content_container: {
            main: `tline-marker-parent`,
            title: {
                main: `w-full flex mb-[20px]`,
                inner_title: `heading-1 text-orange max-w-[286px] mt-[20px]\ 
                ${data.Title_Image.data ? 'ml-[15px]' : ''}`,
                image: {
                    main: `flex`,
                    img: `max-w-[165px] self-start`,
                },
            },
            subtitle: `heading-3 text-cyan block pb-[10px]`,
            description: `paragraph-1 text-cyan pb-[30px] max-w-[500px]`,
            btn_container: `flex flex-wrap self-start`,
            button: `flex m-[5px]`,
            tline_marker: `tline-marker-orange top-[100px]`,
        },
        image: {
            main: `flex flex-[50%] justify-between items-center tline-marker-parent`,
            tline_marker: `tline-marker-orange top-[50%] translate-y-[-50%] self-start flex-grow`,
            img: `img-wide img-cyan`
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
                            className="w-full"
                            fill 
                        />
                    </div>
                </div>
            </div>  
            }
        </div>
    )
}