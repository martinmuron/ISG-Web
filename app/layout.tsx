import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prague Real Estate for Expats | ISG - English Speaking Property Experts",
  description: "Prague's #1 English-speaking real estate agency for expats. Buy, sell, finance & manage Czech properties. 15+ years serving international clients. Free consultation.",
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