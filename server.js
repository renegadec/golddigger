import http from 'node:http'
import path from 'node:path'
import { serveStatic } from './utils/serveStatic.js'
import { getGoldPrice } from './utils/getGoldPrice.js'
import { createPdf } from './utils/createPdf.js'
import fs from 'node:fs/promises'


const PORT = 8000

const __dirname = import.meta.dirname
const pathTxt = path.join(__dirname, 'data', 'transactions.txt')

const server = http.createServer( async (req, res) => {

    if (req.url === '/gold' && req.method === 'POST') {
            let body = ''

            for await (const chunk of req) {
                body += chunk
            }

            try {
                const data = JSON.parse(body)
                
                const amount = data.amount
                const goldPrice = data.goldPrice
                const goldOunces = data.goldOunces

                const timestamp = new Date().toISOString()
                const textData = `${timestamp}, amount paid: ${amount}, price per Oz: $${goldPrice}, gold sold: ${goldOunces} Oz\n`

               await fs.appendFile(pathTxt, textData)
                    // if (err) {
                    //     console.error('Error writing to file', err)
                    //     res.statusCode = 500
                    //     res.end('Failed to save data')
                    //     return
                    // 
                const { pdfBytes, fileName } = await createPdf(amount, goldPrice, goldOunces)
                console.log('Pdf created successfully')
               
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/pdf')
                res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
                res.end(Buffer.from(pdfBytes))
            } catch (err) {
                console.error('Invalid JSON', err)
                res.statusCode = 400
                res.end('Invalid JSON format')
            }
        } else if (req.url === '/gold/price') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')

        setInterval( () => {
            const goldPrice = getGoldPrice()
            res.write(
                `data: ${JSON.stringify({ event: 'price-updated', price: goldPrice})}\n\n`
            )
        }, 5000)
    } else {
        return await serveStatic(req, res, __dirname)
    }   
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
