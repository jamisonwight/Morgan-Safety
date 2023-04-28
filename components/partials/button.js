import getConfig from "next/config";
import {
    Link,
    Element,
    Events,
    animateScroll as scroll,
    scroller,
  } from "react-scroll"

export default function Button(
    { type, text, url, isTrainingTrigger, classes, showForm, setShowForm, isMedia = false }) {
    const { publicRuntimeConfig } = getConfig()

    function checkTrainingtrigger(event, isTrigger) {
        if (isTrigger) {
            event.preventDefault()
            setShowForm(true)
        }
    }

    const getLink = (text, url, isTrainingTrigger, classes) => {
        if (url.charAt(0) == '#' && !isTrainingTrigger) {
            let newUrl = url.slice(1)
    
            return (
                <Link activeClass="active"
                    to={newUrl}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    hashSpy={true}
                    duration={500}
                    delay={200}
                    isDynamic={true}
                    ignoreCancelEvents={false}
                    spyThrottle={500}
                    className={classes}
                    >
                    <span className="!text-[inherit]">{text}</span>
                </Link>
            )
        }
        return (
            <a 
                href={isMedia ? publicRuntimeConfig.BASE_URL + url : url }
                onClick={(e) => checkTrainingtrigger(e, isTrainingTrigger)}
                className={classes}
                >
                <span className="!text-[inherit]">{text}</span>
            </a>
        )
    }

    return (
        <div className={`btn btn-${type} hover:rounded-lg transition-all duration-200 ${classes}`}>
            {getLink(text, url, isTrainingTrigger, `block w-full h-full flex justify-center items-center`)}
        </div>
    )
}