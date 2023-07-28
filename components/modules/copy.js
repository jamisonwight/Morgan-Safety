import Button from '../partials/button'
import ReactMarkdown from 'react-markdown'

export default function Copy({ data, showForm, setShowForm, index }) {

    const styles =  {
        main: `w-full bg-black-100 z-10`,
        container: `w-full relativeflex px-10 sm:py-[0] max-w-[100%]`,
        content: {
            main: `flex flex-col justify-center items-center flex-[50%] my-[60px]`,
            content_container: `max-w-[800px]`,
            title: {
                main: `w-full flex justify-start mt-[30px] order-item-2`,
                inner_title: `heading-4-lg !font-normal text-orange`,
            },
            subtitle: `heading-3 text-orange block pb-[10px]`,
            copy: `paragraph-2 text-orange [&>p]:pb-[30px]`,
            btn_container: `flex flex-wrap mt-[20px]`,
            button: `text-center max-w-[250px]`,
        },
    }

    return (
        <div className={`copy ${styles.main}`} id={`module-${index}`}>
            {data &&
            <div className={`container ${styles.container}`}>
                <div className={`content ${styles.content.main}`}>
                    <div className={styles.content.content_container}>
                        <div className={`title ${styles.content.title.main}`}>
                            <h1 className={`inner-title ${styles.content.title.inner_title}`}>
                                {data.Title}
                            </h1>
                        </div>

                        <span className={`subtitle ${styles.content.subtitle}`}>
                            {data.Subtitle}
                        </span>

                        <div className={`copy ${styles.content.copy}`}>
                            <ReactMarkdown children={data.Content} escapeHtml={false} />
                        </div>

                        <div className={`btn-container ${styles.content.btn_container}`}>
                            {data.Links && 
                                data.Links.map((link) => (
                                    <Button
                                        key={link.id} 
                                        type={link.Button_Type}
                                        text={link.Text}
                                        url={link.URL}
                                        isTrainingTrigger={link.Schedule_Training_Button}
                                        classes={`${styles.content.button}`}
                                        showForm={showForm}
                                        setShowForm={setShowForm}
                                        isMedia={link.Is_Media}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>  
            }
        </div>
    )
}