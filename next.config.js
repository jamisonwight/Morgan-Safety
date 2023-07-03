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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'morgan-safety-services-cms-s37eh.ondigitalocean.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'https://morgan-safety-services-cms-s37eh.ondigitalocean.app/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig