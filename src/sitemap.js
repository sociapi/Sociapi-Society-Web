import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'

const links = [
  { url: '/', changefreq: 'weekly', priority: 1 }
]

const sitemap = new SitemapStream({
  hostname: 'https://sociapis.vercel.app'
})

const writeStream = createWriteStream('./public/sitemap.xml')

streamToPromise(
  links.reduce((stream, link) => {
    sitemap.write(link)
    return stream
  }, sitemap)
)

sitemap.end()

sitemap.pipe(writeStream)