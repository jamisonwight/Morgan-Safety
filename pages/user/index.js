

export default function User() {
    const styles = {
        main: `w-full h-full relative left-[50%] translate-x-[-50%] flex justify-center py-[60px] max-w-[1440px] bg-black`,
        title: `heading-1 text-orange`,
    }

    return (
        <div className={`users`}>
            <div className={`container ${styles.main}`}>
                <div className={`title ${styles.title}`}>Welcome {}</div>
            </div>
        </div>
    )
}