import { JwtAdapter } from '../infra/adapters/jwt.adapter';

export class TokenUtil {
  static async generateToken(id: number): Promise<string> {
    return await JwtAdapter.generateTokenById(id)
  }

  static async verifyToken(token: string) {
    return await JwtAdapter.verifyToken(token)
  }

  static getIdFromToken(token: string): number {
    return JwtAdapter.getIdFromToken(token)
  }
}
