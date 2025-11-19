let goldPrice = 4041

export function getGoldPrice() {
        
        const change = Math.random() < 0.5 ? -0.5 : 0.8

        goldPrice += change

        return (Math.round(goldPrice * 100)/100).toFixed(2)
    
}


