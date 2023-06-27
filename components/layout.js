import { useState } from 'react'
import CookieConsent from "react-cookie-consent"
import UserProvider from '../context/user'
import Header from './header'
import Footer from './footer'
import useSWR from 'swr'
import getConfig from "next/config";
import ContactForm from './contactForm'
import MobileMenu from './mobileMenu'
import AccountHeader from './account/header'

export default function Layout({ children, showForm, setShowForm, showMobileMenu, setShowMobileMenu }) {
  
  const { publicRuntimeConfig } = getConfig();
  const [showIsMenuOpen, setShowIsMenuOpen] = useState(false)
  const headerURL = publicRuntimeConfig?.API_HEADER;
  const {data: hdata} = useSWR(headerURL, (apiURL) => fetch(apiURL).then(res => res.json()))
  const footerURL = publicRuntimeConfig?.API_FOOTER;
  const { data: fdata } = useSWR(footerURL, (apiURL) => fetch(apiURL).then(res => res.json()))

  const handleIsMenuOpen = (isMenuOpenState) => {
    setShowIsMenuOpen(isMenuOpenState)
  }

  return (
    <main>
      <UserProvider 
        children={
          <>
            <AccountHeader />

            <Header 
              links={hdata && hdata.data.attributes} 
              showForm={showForm} 
              setShowForm={setShowForm}
              showMobileMenu={showMobileMenu} 
              setShowMobileMenu={setShowMobileMenu}
              showIsMenuOpen={showIsMenuOpen} 
              setShowIsMenuOpen={handleIsMenuOpen}  
            />

            {showMobileMenu && 
              <MobileMenu 
                links={hdata && hdata.data.attributes}
                showForm={showForm} 
                setShowForm={setShowForm} 
                showMobileMenu={showMobileMenu} 
                setShowMobileMenu={setShowMobileMenu}
                showIsMenuOpen={showIsMenuOpen} 
                setShowIsMenuOpen={handleIsMenuOpen}  
              />
            }

            {children}

            {showForm && 
              <ContactForm 
                showForm={showForm} 
                setShowForm={setShowForm} 
              />
            }

            <Footer data={fdata && fdata.data.attributes} showForm={showForm} setShowForm={setShowForm} />
          </>
        } 
      />
    </main>
  )
}