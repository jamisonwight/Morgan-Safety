import Button from '../components/partials/button'

function ThankYou() {
    const styles = {
        main: `relative block w-full left-[50%] translate-x-[-50%] flex flex-col items-center justify-center px-10 min-h-[calc(100vh_-_270px)] max-w-[1200px]`,
        container: `relative block flex flex-col items-center`,
        heading: `heading-1 text-orange text-center mb-[20px]`,
        paragraph: `paragraph-1 text-center text-orange`,
        btn: `relative top-[40px]`
    }

    return (
        <div className={`thank-you ${styles.main}`}>
            <div className={`container ${styles.container}`}>
                <h1 className={styles.heading}>Thank you for your submission</h1>
                <p className={styles.paragraph}>Someone will be in contact with you shortly!</p>
                <Button
                    key={1} 
                    type={`fill-orange`}
                    text={`Back To Home`}
                    url={'/'}
                    isTrainingTrigger={false}
                    classes={styles.btn}
                />
            </div>
        </div>
    );
}

export default ThankYou;