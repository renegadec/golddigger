import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { getGoldPrice } from './utils/getGoldPrice.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer( async (req, res) => {
    if(!req.url.startsWith('/gold/price')){
        return await serveStatic(req, res, __dirname)
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
    }
    
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
