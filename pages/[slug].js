import getConfig from "next/config";
import { NextSeo } from 'next-seo'
import Modules from '../components/modules'


export default function Page({ pageData: data, bios, showForm, setShowForm }) {
  
  return (
    <div>
      {/* Get Training Page data */}
      {data &&
        <div className={data.Slug_Title} key={data.id}>
            <Modules 
              data={data} 
              bios={bios.data.attributes.Bio}
              showForm={showForm} 
              setShowForm={setShowForm} 
            />
          

          {/* Set SEO Content */}
            <NextSeo
              title={data.attributes.seo.metaTitle}
              description={data.attributes.seo.metaDescription}
            />
            
          </div>
    }
    </div>
  )
}

export async function getStaticPaths() {
  const { publicRuntimeConfig } = getConfig()

  // Get posts from our API
  // Pages
  const pages_res = await fetch(publicRuntimeConfig.API_PAGES)
  const pages = await pages_res.json()

  // Get the paths we want to pre-render based on posts
  const paths = pages.data.map((page) => ({
    params: { slug: page.attributes.Slug_Title},
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { publicRuntimeConfig } = getConfig()

  // Get posts from our API
  // Pages
  const pages_res = await fetch(publicRuntimeConfig.API_PAGES)
  const pages = await pages_res.json()

  // Get Bios from our API
  // Bios
  const bios_res = await fetch(publicRuntimeConfig.API_BIOS)
  const bios = await bios_res.json()
  
  let pageData 

  pages.data.map((p) => {
    if (p.attributes.Slug_Title === params.slug ) pageData = p
  })

  return {
    props: { pageData, bios },
    revalidate: 60,
  } 
}