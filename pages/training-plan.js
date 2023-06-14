import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import getConfig from "next/config";
import { NextSeo } from 'next-seo'
import Modules from '../components/modules'


export default function TrainingPlan({ pages, showForm, setShowForm }) {
  const { data } = pages

  return (
    <div>
      {/* Get Training Page data */}
      {data &&
        data.map((page) => (
          
        <div className="training-plan" key={page.id}>
            {page.attributes.Title == 'Training Plan' &&
              <Modules 
                data={page} 
                bios={bios.data.attributes.Bio}
                showForm={showForm} 
                setShowForm={setShowForm} 
              />
            }

            {/* Set SEO Content */}
            {page.attributes.Title == 'Training Plan' &&
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

  return {
    props: { pages, bios }
  } 
}