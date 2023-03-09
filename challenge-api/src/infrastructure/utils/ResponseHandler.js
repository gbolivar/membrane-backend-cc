export const responseSuccess = (status, res, message, data) => {
    let msg = {}
    if (typeof data === 'undefined'){
        msg = {
            message: message
        }
        
    }else{
        msg = {
            message: message,
            data: data
        }
        
    }
    return res.status(status).json(msg)
}