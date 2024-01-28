import { Request, Response, NextFunction } from 'express';
import { TokenUtil } from '../../utils/token.util';
import { ICustomRequest } from '../../infra/interfaces/ICustomRequest';
import { LoggerUtil } from '../../utils/logger.util';


export const verifyTokenMiddleware = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  LoggerUtil.logInfo('Iniciando o middleware auth', 'middlewares/auth.middleware.ts');
  const headers = req['headers'];
  let token = headers['authorization']; 
  if (!token) {
    LoggerUtil.logError('Token not received!', 'middlewares/auth.middleware.ts', 'verifyTokenMiddleware');
    return res.status(401).json({ message: 'Token not received!' });
  }

  try {
    let errors: any[] = [];
    token = token.replace('Bearer ', '').trim();
    await TokenUtil.verifyToken(token as string);
    req.userId = TokenUtil.getIdFromToken(token as string); 
    if(errors.length > 0) {
      LoggerUtil.logError('Middleware auth error', 'middlewares/auth.middleware.ts', 'verifyTokenMiddleware');
      return res.status(401).json({ 
        message: 'Middleware auth error',
        errors: errors
      });
    }

    next();
} catch (error) {
    LoggerUtil.logError('Invalid Token!', 'middlewares/auth.middleware.ts', 'verifyTokenMiddleware');
    return res.status(401).json({ message: 'Invalid Token!' });
  }
};