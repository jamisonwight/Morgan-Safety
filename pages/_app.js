import '@/styles/globals.css'
import Layout from '../components/layout'
import { useState } from 'react';

export default function App({ Component, pageProps, bios }) {
  const [showForm, setShowForm] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleShowForm = (showFormState) => {
    setShowForm(showFormState)
  }

  const handleMobileMenu = (showMenuState) => {
    setShowMobileMenu(showMenuState)
  }

  return (
    <Layout 
      showForm={showForm} 
      setShowForm={handleShowForm} 
      showMobileMenu={showMobileMenu} 
      setShowMobileMenu={handleMobileMenu}
      >
      <Component 
        showForm={showForm} 
        setShowForm={handleShowForm}
        showMobileMenu={showMobileMenu} 
        setShowMobileMenu={handleMobileMenu}  
        bios={bios} 
        {...pageProps} 
      />
    </Layout>
  )
}