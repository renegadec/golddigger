//can be replaced with a real gold api. Used this for the sake of testing

let goldPrice = 4041

export function getGoldPrice() {
        
        const change = Math.random() < 0.5 ? -0.1 : 0.1

        goldPrice += change

        return (Math.round(goldPrice * 100)/100).toFixed(2)
    
}


