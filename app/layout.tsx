import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prague Real Estate for Expats | ISG - English Speaking Property Experts",
  description: "Prague's #1 English-speaking real estate agency for expats. Buy, sell, finance & manage Czech properties. 15+ years serving international clients. Free consultation.",
  keywords: "Prague real estate, Czech Republic property, expat housing Prague, English speaking real estate agent, Prague apartments, Czech property investment, Prague home buying, expat relocation Prague, international real estate Prague, Prague property management",
  authors: [{ name: "ISG Real Estate Prague" }],
  creator: "ISG Real Estate Prague",
  publisher: "ISG Real Estate Prague",
  robots: "index, follow",
  metadataBase: new URL('https://isg-web.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Prague Real Estate for Expats | ISG - English Speaking Property Experts',
    description: "Prague's #1 English-speaking real estate agency for expats. Buy, sell, finance & manage Czech properties. 15+ years serving international clients.",
    siteName: 'ISG Real Estate Prague',
    images: [
      {
        url: '/images/hero/prague-skyline.jpg',
        width: 1200,
        height: 630,
        alt: 'Prague Real Estate - Beautiful Prague skyline and properties',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prague Real Estate for Expats | ISG',
    description: "Prague's #1 English-speaking real estate agency for expats. 15+ years serving international clients.",
    images: ['/images/hero/prague-skyline.jpg'],
  },
  verification: {
    google: 'verification-code-here',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages({ locale: 'en' });

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://isg-web.vercel.app/#organization",
        "name": "ISG Real Estate Prague",
        "alternateName": "ISG",
        "description": "Prague's premier English-speaking real estate agency specializing in expat services. Professional property buying, selling, financing, and management services in Czech Republic.",
        "url": "https://isg-web.vercel.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://isg-web.vercel.app/images/logos/isg-logo.png",
          "width": 300,
          "height": 100
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+420-XXX-XXX-XXX",
          "contactType": "customer service",
          "areaServed": ["CZ", "Prague"],
          "availableLanguage": ["English", "Czech"]
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Your Street Address",
          "addressLocality": "Prague",
          "addressRegion": "Prague",
          "postalCode": "11000",
          "addressCountry": "CZ"
        },
        "sameAs": [
          "https://www.facebook.com/ISGPrague",
          "https://www.linkedin.com/company/isg-prague",
          "https://www.instagram.com/isgprague"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://isg-web.vercel.app/#business",
        "name": "ISG Real Estate Prague",
        "image": "https://isg-web.vercel.app/images/hero/prague-skyline.jpg",
        "description": "Expert real estate services for expats in Prague and Czech Republic. English-speaking agents with 15+ years experience in property buying, selling, financing, and management.",
        "url": "https://isg-web.vercel.app",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Your Street Address",
          "addressLocality": "Prague",
          "addressRegion": "Prague",
          "postalCode": "11000",
          "addressCountry": "CZ"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 50.0755,
          "longitude": 14.4378
        },
        "telephone": "+420-XXX-XXX-XXX",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://isg-web.vercel.app/#website",
        "url": "https://isg-web.vercel.app",
        "name": "ISG Real Estate Prague",
        "description": "Prague Real Estate for Expats - English Speaking Property Experts",
        "publisher": {
          "@id": "https://isg-web.vercel.app/#organization"
        },
        "inLanguage": "en-US"
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale="en" messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}