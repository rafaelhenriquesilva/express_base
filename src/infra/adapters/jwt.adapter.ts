import jwt from 'jsonwebtoken';
const TIME_IN_MILLISECONDS = process.env.TIME_IN_MILLISECONDS || 7200000; // 2 hours
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT || 'JWT_TEST_TOKEN';

export class JwtAdapter {
    static generateTokenById(id: number): string {
        try {
            const token = jwt.sign({
                id,
                type: 'Bearer'
            }, SECRET_KEY_JWT, {
                expiresIn: TIME_IN_MILLISECONDS,
            });
            return token;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    static async verifyToken(token: string) {
        try {
            const verifyToken = jwt.verify(token, SECRET_KEY_JWT)

            if (verifyToken)
                return true
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    static getIdFromToken(token: string): number {
        const decoded = jwt.decode(token);
        return decoded ? (decoded as any).id : 0;
    }
}
