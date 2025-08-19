import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'cs'] as const;

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = (!locale || !locales.includes(locale as any)) ? 'en' : (locale as string);
  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default
  };
});