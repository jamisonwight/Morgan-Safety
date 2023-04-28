import Header from './header'
import Footer from './footer'
import useSWR from 'swr'
import getConfig from "next/config";
import ContactForm from './contactForm'
import { motion } from "framer-motion";

export default function Layout({ children, showForm, setShowForm }) {
  const { publicRuntimeConfig } = getConfig();
  const headerURL = publicRuntimeConfig?.API_HEADER;
  const {data: hdata} = useSWR(headerURL, (apiURL) => fetch(apiURL).then(res => res.json()))

  const footerURL = publicRuntimeConfig?.API_FOOTER;
  const { data: fdata } = useSWR(footerURL, (apiURL) => fetch(apiURL).then(res => res.json()))

  return (
    <>
      <Header links={hdata && hdata.data.attributes} showForm={showForm} setShowForm={setShowForm} />

      <main showForm={showForm} setShowForm={setShowForm}>{children}</main>

      {showForm && <ContactForm showForm={showForm} setShowForm={setShowForm} />}

      <Footer data={fdata && fdata.data.attributes} showForm={showForm} setShowForm={setShowForm} />
    </>
  )
}
