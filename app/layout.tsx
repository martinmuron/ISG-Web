import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ISG - Investment Solutions Group",
  description: "Professional real estate investment services offering modern apartments, houses, and investment properties with expert guidance and over a decade of experience.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages({ locale: 'en' });

  return (
    <html lang="en">
      <body>
        <NextIntlClientProvider locale="en" messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}