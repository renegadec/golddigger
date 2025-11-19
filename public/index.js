const priceDisplay = document.getElementById('price-display')
const investBtn = document.getElementById('invest-btn')
const successModal = document.getElementById('success_modal')
const closeBtn = document.getElementById('close_btn')
const investedAmount = document.getElementById('invested_amount')
const purchasedGold = document.getElementById('gold_ounces')

const eventSource = new EventSource('/gold/price')

let investmentAmount = 0
let goldPrice = 0

investBtn.addEventListener('click', (e) => {
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
    const goldAmountOunces = investmentAmount / goldPrice
    purchasedGold.textContent = goldAmountOunces.toFixed(4)
}