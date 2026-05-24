export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/habgra/', '/api/'],
    },
    sitemap: 'https://savrappindia.vercel.app/sitemap.xml',
  }
}