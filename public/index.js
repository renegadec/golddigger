const eventSource = new EventSource('/gold/price')

const priceDisplay = document.getElementById('price-display')

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    
    const goldPrice = data.price

    priceDisplay.textContent = goldPrice
}

eventSource.onerror = () => {
    console.log('Connection Failed');
}