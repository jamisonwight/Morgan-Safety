import Document, { Html, Head, Main, NextScript } from 'next/document';

function initializeGoogleAnalytics() {
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-VE4N5041T0');
  `;
}

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VE4N5041T0"></script>
        <script dangerouslySetInnerHTML={{ __html: initializeGoogleAnalytics() }}></script>
        <link rel="stylesheet" href="https://use.typekit.net/hyq2tni.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}