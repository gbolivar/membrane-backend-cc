'use strict';

let price = 0;
let maxOrderSize = 0;
let priceLimitLocal = 1;
let rateLocal = 0;
let quantityLocal = 0;


export const CalculateEffective = {
    async main(currentLocal, currentPriceLimitParam, amountLocal){
        priceLimitLocal = currentPriceLimitParam
        let currentAmount = amountLocal;
        let currentPriceLimit = currentPriceLimitParam;
        for(let i=0; i<currentLocal.length && currentAmount>0 && CalculateEffective.validatePriceLimit(currentPriceLimit); i++){
            console.info(currentLocal[i])
            for (let h=0; h<currentLocal[i].length; h++){
                    rateLocal = parseFloat(currentLocal[i][h].rate)
                    quantityLocal = parseFloat(currentLocal[i][h].quantity)
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
            }
        }
        if(currentAmount > 0 && CalculateEffective.validatePriceLimit(currentPriceLimit)){
            return -1;
        } else{ 
            return (priceLimitLocal != -1)? {"maximumOrde" : maxOrderSize} : {"expeditedPrice" : price};
        }
    },
    validatePriceLimit(priceLimitLocalLimit){
        return (priceLimitLocal == -1)? true : (priceLimitLocalLimit > 0)
    }
}