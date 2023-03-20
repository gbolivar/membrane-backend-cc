// params need to be in order 
import { log } from '../../infrastructure/utils/index.js'

export const ErrorHandler = (err, req, res, next) => {
    console.log(err)
    return res.status(err.status || 400).json({
        isSuccess: false,
        msg: err.msg || err.message || 'Unknown error happened'
    });
};