/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    TEST_EMAIL: process.env.TEST_EMAIL,
    TEST_EMAIL_PW: process.env.TEST_EMAIL_PW,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_EMAIL_PW: process.env.ADMIN_EMAIL_PW,
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    API_HEADER: process.env.API_HEADER,
    API_FOOTER: process.env.API_FOOTER,
    API_PAGES: process.env.API_PAGES,
    API_CONTACTS: process.env.API_CONTACTS,
    API_BIOS: process.env.API_BIOS,
  },
  images: {
    domains: [
      'https://morgan-safety-services-cms-s37eh.ondigitalocean.app',
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig