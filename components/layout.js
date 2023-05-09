import { useState } from 'react';
import Header from './header'
import Footer from './footer'
import useSWR from 'swr'
import getConfig from "next/config";
import ContactForm from './contactForm'
import MobileMenu from './mobileMenu';

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
    <>
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

      <main showForm={showForm} setShowForm={setShowForm}>{children}</main>

      {showForm && 
        <ContactForm 
          showForm={showForm} 
          setShowForm={setShowForm} 
        />
      }

      <Footer data={fdata && fdata.data.attributes} showForm={showForm} setShowForm={setShowForm} />
    </>
  )
}
