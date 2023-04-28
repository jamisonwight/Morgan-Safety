import '@/styles/globals.css'
import Layout from '../components/layout'
import { useState } from 'react';

export default function App({ Component, pageProps, bios }) {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = (showFormState) => {
    setShowForm(showFormState);
  };

  return (
    <Layout showForm={showForm} setShowForm={handleShowForm}>
      <Component showForm={showForm} setShowForm={handleShowForm} bios={bios} {...pageProps} />
    </Layout>
  )
}