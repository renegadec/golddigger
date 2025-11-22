import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import path from 'node:path'
import fs from 'node:fs/promises'

const __dirname = import.meta.dirname


export async function createPdf(investmentAmount, goldPrice, goldAmountOunces) {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create()

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    // Add a blank page to the document
    const page = pdfDoc.addPage()

    // Get the width and height of the page
    const { width, height } = page.getSize()

    // Draw a string of text toward the top of the page
    const fontSize = 25
    page.drawText('Details for the gold purchased!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
    })

    
    page.drawText(`You bought ${goldAmountOunces} oz of gold.`, {
    x: 50,
    y: height - 5 * fontSize,
    size: fontSize - 7,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
    })

    page.drawText(`You used $${investmentAmount} to purchase.`, {
    x: 50,
    y: height - 6 * fontSize,
    size: fontSize - 7,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
    })

    page.drawText(`You bought your gold at an average price of $${goldPrice}.`, {
    x: 50,
    y: height - 7 * fontSize,
    size: fontSize - 7,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
    })

    page.drawText(`GoldDigger thanks you for your business.`, {
    x: 50,
    y: height - 8 * fontSize,
    size: fontSize - 10,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
    })

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    const pdfPath = path.join(__dirname, '..', 'pdfs', `receipt_${Date.now()}.pdf`)

    await fs.mkdir(path.dirname(pdfPath), {recursive: true})

    return pdfPath
}
