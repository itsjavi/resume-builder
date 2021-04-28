var express = require('express')
var router = express.Router()

const puppeteer = require('puppeteer')
const {v1: uuidv1} = require('uuid')

const fs = require('fs')
var path = require('path')

const MongoClient = require('mongodb').MongoClient

MongoClient.connect(process.env.MONGODB_DSN, {useUnifiedTopology: true})
  .then(client => {
    const db = client.db('wtf-resume')
    const quotesCollection = db.collection('pdf')


    router.get('/', (req, res, next) => {
      db.collection('pdf').find({pdfId: req.query.data}).toArray()
        .then(results => {
          res.send(results[0])
        })
        .catch(error => console.error(error))
    })

    // TODO: convert PDF generator into a proxy service in a separate container
    router.post('/', (req, res, next) => {
      const uuid = uuidv1()
      const pdfId = {pdfId: uuid}
      const data = {...pdfId, ...req.body}
      quotesCollection.insertOne(data)
        .then(result => {
          console.log(result)
        })
        .catch(error => console.error(error))

      const generatePDF = async () => {
        const browser = await puppeteer.launch({
          args: [
            // Required for Docker version of Puppeteer
            '--no-sandbox',
            '--headless',
            '--disable-setuid-sandbox',
            // This will write shared memory files into /tmp instead of /dev/shm,
            // because Docker’s default for /dev/shm is 64MB
            '--disable-dev-shm-usage'
          ]
        })

        const browserVersion = await browser.version()
        console.log(`Started ${browserVersion}`)

        const page = await browser.newPage()
        await page.goto(`${process.env.CLIENT_URL}/preview?export=true&data=${uuid}`, {
          waitUntil: 'networkidle2'
        })
        await page.emulateMedia('screen')
        await page.content()
        const pdf = await page.pdf({
          // path: `./pdf/${uuid}.pdf`,
          printBackground: true,
          format: 'A4',
          width: '210mm',
          height: '297mm'
        })
        await browser.close()

        res.contentType('application/pdf')
        res.send(pdf)
      }
      // const file = `${__dirname}/pdf/${uuid}.pdf`;
      generatePDF()
    })
  })
  .catch(error => console.error(error))

module.exports = router
