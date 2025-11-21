const priceDisplay = document.getElementById('price-display')
const investBtn = document.getElementById('invest-btn')
const successModal = document.getElementById('success_modal')
const closeBtn = document.getElementById('close_btn')
const investedAmount = document.getElementById('invested_amount')
const purchasedGold = document.getElementById('gold_ounces')

const eventSource = new EventSource('/gold/price')

let investmentAmount = 0
let goldPrice = 0
let goldAmountOunces

investBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const inputVal = document.getElementById('investment-amount').value
    investmentAmount = Number(inputVal)
    if(isNaN(investmentAmount) || investmentAmount <= 0){
        alert('Please enter a valid amount to invest')
        return
    }

    investedAmount.textContent = investmentAmount
    calcPurchasedGold()
    successModal.showModal()

    try {
        const res = await fetch('/gold', {
            method: 'POST',
            headers: {  'Content-Type': 'application/json'},
            body: JSON.stringify({
                amount: investmentAmount,
                goldPrice: goldPrice,
                goldOunces: goldAmountOunces.toFixed(4)
            })
        })
        const resultText = await res.text()
        console.log(resultText)
    } catch (err) {
        console.log('Failed to send data', err)
    }
})

closeBtn.addEventListener('click', () => {
    successModal.close()
})

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)

    goldPrice = data.price

    priceDisplay.textContent = goldPrice
}

eventSource.onerror = () => {
    console.log('Connection Failed');
}

function calcPurchasedGold(){
    goldAmountOunces = investmentAmount / goldPrice
    purchasedGold.textContent = goldAmountOunces.toFixed(4)
}