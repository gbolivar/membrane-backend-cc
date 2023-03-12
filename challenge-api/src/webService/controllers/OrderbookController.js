import { responseCode, responseSuccess, log} from '../../infrastructure/utils/index.js';
import { ProcessDataOrderbookService } from '../../application/service/index.js';
//import { CheckOrderbookTipValidator } from '../validator/index.js'


export const OrderbookController = {

    async getTip(req, res, next) {
        try {
            console.log(req.params.pair)
            const msg = {
                "bidDelta": {
                    "quantity": "0.0000",
                    "rate": "20598.00000000000"
                },
                "askDelta": {
                    "quantity": "0.19974633",
                    "rate": "20637.00000000000"
                }
            };
            ProcessDataOrderbookService.getTip(req.params.pair)
            responseSuccess(responseCode.OK.code, res, msg)
        } catch (error) {
            next(error);
        }
    }
}