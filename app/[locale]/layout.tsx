import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
// removed unused notFound import
import { locales } from '@/i18n';
import '../globals.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "REALITY JJ - Prague Real Estate",
  description: "Family-run real estate company offering modern apartments, houses, and investment properties in Prague with over a decade of experience.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

type LocaleParams = { locale: string };

function isPromise<T>(value: unknown): value is Promise<T> {
  return typeof (value as { then?: unknown }).then === 'function';
}

export default async function LocaleLayout(props: unknown) {
  const { children, params } = (props as { children: React.ReactNode; params: LocaleParams | Promise<LocaleParams> });
  const resolvedParams = isPromise<LocaleParams>(params) ? await params : params;
  const { locale } = resolvedParams;
  if (!locales.includes(locale as "en" | "cs")) {
    return (
      <html lang="en">
        <body>
          <NextIntlClientProvider locale={"en"} messages={await getMessages({ locale: 'en' })}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}