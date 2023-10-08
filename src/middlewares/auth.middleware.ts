import { Request, Response, NextFunction } from 'express';
import { JwtUtil } from '../utils/jwt.util';
import { ICustomRequest } from '../interfaces/ICustomRequest';

export const verifyTokenMiddleware = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  const headers = req['headers'];
  const token = headers['authorization']; 
  if (!token) {
    return res.status(401).json({ message: 'Token not received!' });
  }

  try {
    let errors: any[] = [];
    await JwtUtil.verifyJwtToken(token as string);
    req.userId = JwtUtil.getIdFromToken(token as string); 
    if(errors.length > 0) {
      return res.status(401).json({ 
        message: 'Middleware auth error',
        errors: errors
      });
    }

    next();
} catch (error) {
    console.info('Error in verifyTokenMiddleware');
    console.error(error);
    return res.status(401).json({ message: 'Invalid Token!' });
  }
};