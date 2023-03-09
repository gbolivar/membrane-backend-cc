/**
 * Author Gregorio Bolivar <elalconxvii@gmail.com>
 * Version 1.0.1
 * Description: Module for code response
 * Create: 2021-10-07 10:14
 * last update: 2021-12-07 00:14
 */
export const responseCode = {
    OK: {
        code: 200,
        msg: 'OK'
    },
    CREATE: {
        code: 201,
        msg: 'Successfully created record',
        msgUpdate: 'The item was updated successfully'
    },
    NO_CONTENT:{
        code: 204,
        msg: 'The server did not find the registry'
    },
    EXIST:{
        code: 210,
        msg: 'Success, Registration already exists'
    },
    UNAUTHORIZED:{
        code: 401,
        msg: 'Unauthorized',
        msgToken: 'Provided token is expired.',
        msgPermission: "You do not have the necessary permissions,"
    },
    FORBIDDEN: {
        code: 403,
        msg: 'Forbidden'
    },
    METHOD_NOT_ALLOWED:{
        code: 405,
        msg: 'ethod not allowed.'
    },
    ERROR_EXCEPTION: {
        code: 409,
        msg: 'Validation errors in your request'

    },
    PRECONDITION_FAILED: {
        code: 412,
        msg: 'Forbidden'
    },
    UNPROCESSABLE_ENTITY: {
        code: 422,
        msg: '-'
    }
    
}