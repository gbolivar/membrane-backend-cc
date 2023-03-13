import { responseCode, responseSuccess, log} from '../../infrastructure/utils/index.js';
import { ProcessDataOrderbookService } from '../../application/service/index.js';


log.load('OrderbookController');
export const OrderbookController = {

    async getTip(req, res, next) {
        try {
            log.info('getTip:strar');
            const tip = await ProcessDataOrderbookService.getTip(req.params.pair)
            log.info('getTip -> msg:('+JSON.stringify(tip)+')');
            responseSuccess(responseCode.OK.code, res, tip)
        } catch (error) {
            next(error);
        }
    },
    async getEffectivePrice(req, res, next ) {
        try {
            responseSuccess(responseCode.OK.code, res, "Under construction")
        } catch (error) {
            next(error);
        }
    }
}