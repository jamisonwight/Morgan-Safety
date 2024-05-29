import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import Button from './partials/button'

// Assets
import email from '../assets/images/email.svg'
import fb from '../assets/images/fb.svg'

export default function footer({ data, showForm, setShowForm }) {

    const year = new Date().getFullYear()

    const toggleHandler = (e) => {
      e.preventDefault()
    }

    const styles = {
      main: `w-full bg-black z-20 border-orange border-t-[1px] border-orange border-solid`,
      container: `full relative left-[50%] translate-x-[-50%] flex justify-between items-end px-4 py-[40px] max-w-[1440px] bg-black z-20 ` +
        `-lg:flex-wrap -sm:flex-col -sm:items-center`,
      contact_info: {
        main: `flex-col flex-[50%]`,
        phone: `heading-6 text-orange mb-[10px]`,
        span: `text-cyan`,
        address: `heading-6 text-orange`,
      },
      legal: {
        main: `h-full flex-col justify-end flex-[50%] text-center -sm:pt-[60px] -lg:order-3`,
        links: `flex justify-center m-0 p-0 list-none`,
        anchor: `heading-7 text-orange inline-block mx-[20px] mb-[20px]`,
        copyright: `paragraph-3 text-orange`,
      },
      callouts: {
        main: `flex-col justify-end items-end flex-[50%] -sm:pt-[60px]`,
        social: `flex justify-end items-end -sm:justify-center text-right mb-[20px]`,
        anchor: `inline-block relative mx-[10px]`,
        contact_button: {
          main: `flex justify-end self-end text-right`,
          btn: `flex`,
        }
      }
    }

    return (
      <div className={`footer ${styles.main}`}>
        {data &&
        <div className={`container ${styles.container}`}>
          <div className={`contact-info ${styles.contact_info.main}`}>
              <div className={`phone ${styles.contact_info.phone}`}>
                <span className={styles.contact_info.span}>Call Us: </span> 
                {data.Phone_Number}
              </div>

              <div className={`address ${styles.contact_info.address}`}>
                <ReactMarkdown children={data.Address} escapeHtml={false} />
              </div>
          </div>

          <div className={`legal ${styles.legal.main}`}>
            <div className={`links ${styles.legal.links}`}>
            {data.Menu &&
              data.Menu.map((link) => (
                <ul key={link.id}>
                  <li>
                    <a 
                      href={link.URL}
                      className={styles.legal.anchor}
                      >
                      {link.Text}
                    </a>
                  </li>
                </ul>
              ))
            }
            </div>

            <div className={`copyright ${styles.legal.copyright}`}>
              &copy;{year} {data.Copyright}
            </div>
          </div>

          <div className={`callouts ${styles.callouts.main}`}>
            <div className={`social ${styles.callouts.social}`}>
              <a 
                href={data.Facebook_URL}
                className={`email ${styles.callouts.anchor}`}
                target="_blank"
                >
                <Image
                    src={fb} 
                    alt="Facebook Icon"
                    loading="lazy"
                    className={styles.callouts.icon}
                    width={13}
                    height={20}
                />
              </a>
              <a 
                href={`mailto: ${data.Email}`}
                className={`email ${styles.callouts.anchor}`}
                target="_blank"
                >
                <Image
                    src={email} 
                    alt="Email Icon"
                    loading="lazy"
                    className={styles.callouts.icon}
                    width={20}
                    height={9}
                />
              </a>
            </div>

            <div className={`contact-btn ${styles.callouts.contact_button.main}`}>
              <Button
                  type={data.Contact_Button.Button_Type}
                  text={data.Contact_Button.Text}
                  url={data.Contact_Button.URL}
                  isTrainingTrigger={data.Contact_Button.Schedule_Training_Button}
                  classes={styles.callouts.contact_button.btn}
                  showForm={showForm} 
                  setShowForm={setShowForm}
              />
            </div>
          </div>
        </div>
      }
      </div>
    )
}