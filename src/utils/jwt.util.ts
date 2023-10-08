import jwt from 'jsonwebtoken';

const TWO_HOUR_IN_MILLISECONDS = 7200000; // 2 hours
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT || 'JWT_TEST_TOKEN';

export class JwtUtil {
  static generateJwtToken(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const token = jwt.sign({ 
          id,
          type: 'Bearer'
         }, SECRET_KEY_JWT, {
          expiresIn: TWO_HOUR_IN_MILLISECONDS,
        });
        resolve(token);
      } catch (error) {
        console.error('Error in generateJwtToken');
        reject(error);
      }
    });
  }

  static async verifyJwtToken(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY_JWT, (err) => {
        if (err) {
          console.error('Error in verifyJwtToken');
          
          reject({
            status: 401,
            message: 'Invalid token',
          });
        } else {
          resolve(true);
        }
      });
    });
  }

  static getIdFromToken(token: string): number {
    const decoded = jwt.decode(token);
    return decoded ? (decoded as any).id : 0;
  }
}
