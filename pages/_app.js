import '@/styles/globals.css'
import Layout from '../components/layout'
import { useState } from 'react'
import { DefaultSeo } from 'next-seo'

export default function App({ Component, pageProps, bios }) {
  const [showForm, setShowForm] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleShowForm = (showFormState) => {
    setShowForm(showFormState)
  }

  const handleMobileMenu = (showMenuState) => {
    setShowMobileMenu(showMenuState)
  }

  const metaKeywords = () => {
    const content = `MSHA safety training. MSHA training services, Mine safety training, Mine safety courses \
    MSHA certification, MSHA compliance training, Mining safety courses, MSHA 30 CFR training, MSHA Part 46 training \
    MSHA Part 48 training, Surface mining safety, Underground mining safety, MSHA training videos, MSHA online training \
    MSHA instructor-led training, MSHA refresher training, MSHA new miner training, Hazard awareness training, MSHA competent person training \
    Mining equipment safety training`

    return content.replace(/\s+/g, ' ').trim();
  }

  return (
    <Layout 
      showForm={showForm} 
      setShowForm={handleShowForm} 
      showMobileMenu={showMobileMenu} 
      setShowMobileMenu={handleMobileMenu}
      >
      <DefaultSeo
          title="MSHA Training - Morgan Safety Services LLC"
          description="MSHA training part 46 and 48b in-house and live video interactive classes."
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url: 'https://morgansafetyservices.com',
            siteName: 'Morgan Safety Services',
        }}
        additionalMetaTags={[{
          property: 'keywords',
          content: metaKeywords()
        }]}
      />

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