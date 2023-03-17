import { responseCode, responseSuccess, log} from '../../infrastructure/utils/index.js'


export const ChallengeController = {

    async getHome(req, res, next) {
        try {
            const msg = "Welcome Membrane Challenge";
            responseSuccess(responseCode.OK.code, res, msg)
        } catch (error) {
            next(error);
        }
    },

    async getInfo(req, res, next) {
        try {
            const msg = {
                "msg": "Api Challenge",
                "ver": "1.0"
            };
            responseSuccess(responseCode.OK.code, res, msg)
        } catch (error) {
            next(error);
        }
    }
}