import Link from 'next/link'

export const getDynamicLink = (text, url, classes) => {
    if (url.charAt(0) == '#') {
        let newUrl = url.slice(1)

        return (
            <Link activeClass="active"
                to={newUrl}
                spy={true}
                smooth={true}
                offset={100}
                hashSpy={true}
                duration={500}
                delay={200}
                isDynamic={true}
                ignoreCancelEvents={false}
                spyThrottle={500}
                className={classes}
                >
                {text}
            </Link>
        )
    }
    return (
        <Link 
            href={url} 
            className={classes}
            >
            {text}
        </Link>
    )
}