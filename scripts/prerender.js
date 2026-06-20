import puppeteer from 'puppeteer'
import fs from 'fs'

const routes = ['https://sociapis.vercel.app/']

const browser = await puppeteer.launch()

for (const route of routes) {
  const page = await browser.newPage()
  await page.goto(route, { waitUntil: 'networkidle0' })

  const html = await page.content()

  const fileName = route === '/' ? 'index.html' : 'index.html'

  fs.writeFileSync(`dist/${fileName}`, html)
}

await browser.close()