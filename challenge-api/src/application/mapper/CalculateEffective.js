'use strict';



let priceLimitLocal = -1;
let rateLocal = 0;
let quantityLocal = 0;
let price = 0;
let maxOrderSize = 0;
let currentAmount = 1;
let currentPriceLimit = null;


export const CalculateEffective = {
    async main(currentLocal, currentPriceLimitParam, amountLocal){
        priceLimitLocal = currentPriceLimitParam
        currentAmount = amountLocal;
        currentPriceLimit = currentPriceLimitParam;


        for(let i=0; i<currentLocal.length && currentAmount>0 && CalculateEffective.validatePriceLimit(currentPriceLimit); i++){
            console.info('currentLocal[i]')
            console.info(currentLocal[i])
           await CalculateEffective.processEvents(currentLocal[i]);
        }
        return (priceLimitLocal != -1)? {"maximumOrde" : maxOrderSize} : {"expeditedPrice" : price}  
    },
    async processEvents(dataJson){
        quantityLocal = parseFloat(dataJson.quantity)
        rateLocal = parseFloat(dataJson.rate)

        console.info(quantityLocal+'<=L1=>'+rateLocal)

        if(priceLimitLocal !== -1){
            if(currentPriceLimit > (quantityLocal * rateLocal)){
                //can buy/sell everything
                maxOrderSize += quantityLocal;
                currentPriceLimit -= (quantityLocal * rateLocal);
            }else{
                //I can buy or sell a piece
                maxOrderSize += currentPriceLimit / rateLocal;
                currentPriceLimit = 0;
            }
        }
        
        if (currentAmount > quantityLocal) {
            // I can buy  or sell everything
            price += rateLocal * quantityLocal; 
            currentAmount -= quantityLocal; 
        } else {
            // I can buy or sell a part
            price += rateLocal * currentAmount;
            currentAmount = 0; 
        }
        console.info('price:'+price);    
    },
    validatePriceLimit(priceLimitLocalLimit){
        return (priceLimitLocal == -1)? true : (priceLimitLocalLimit > 0)
    }
}