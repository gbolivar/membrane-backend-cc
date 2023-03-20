import { validationResult } from 'express-validator';
import { responseCode } from '../../infrastructure/utils/index.js';

export function SchemaRequestValidator(req, res, next){
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(responseCode.PRECONDITION_FAILED.code).json({errors: errors.errors});
  }
  next();
}