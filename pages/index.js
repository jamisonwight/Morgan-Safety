import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import getConfig from "next/config";
import { NextSeo } from 'next-seo'
import Modules from '../components/modules'
import { useEffect } from 'react';

export default function Home({ pages, bios, showForm, setShowForm }) {
  
  useEffect(() => {
    const homePage = pages.data.find((page) => page.attributes.Title === 'Home');
    if (homePage) {
      // Set SEO Content
      NextSeo({
        title: homePage.attributes.seo.metaTitle,
        description: homePage.attributes.seo.metaDescription
      });
    }
  }, [pages]);

  const homePages = pages.data.filter((page) => page.attributes.Title === 'Home');

  return (
    <div>
      {/* Render Home Pages */}
      {homePages.map((page) => (
        <div className="page-home" key={page.id}>
          
          <div className="helmet-backdrop"></div>
          
          <Modules
            data={page}
            bios={bios?.data.attributes.Bio}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        </div>
      ))}
    </div>
  );
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