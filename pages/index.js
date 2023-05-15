import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import getConfig from "next/config";
import { NextSeo } from 'next-seo'
import Modules from '../components/modules'


export default function Home({ pages, bios, showForm, setShowForm }) {
  const { data } = pages

  return (
    <div>
      {/* Get Home Page data */}
      {data &&
        data.map((page) => (
          
        <div className="page-home" key={page.id}>
            {page.attributes.Title == 'Home' &&
              <div className="helmet-backdrop"></div>
            }

            {page.attributes.Title == 'Home' &&
              <Modules 
                data={page} 
                bios={bios.data.attributes.Bio}
                showForm={showForm} 
                setShowForm={setShowForm} 
              />
            }

            {/* Set SEO Content */}
            {page.attributes.Title == 'Home' &&
              <NextSeo
                title={page.attributes.seo.metaTitle}
                description={page.attributes.seo.metaDescription}
              />
            }
          </div>

      ))}
    </div>
  )
}

export async function getStaticProps() {
  const { publicRuntimeConfig } = getConfig();

  // Get posts from our API
  // Pages
  const pages_res = await fetch(publicRuntimeConfig.API_PAGES)
  const pages = await pages_res.json()

  // Bios
  const bios_res = await fetch(publicRuntimeConfig.API_BIOS)
  const bios = await bios_res.json()

  return {
    props: { pages, bios },
    revalidate: 60,
  } 
}