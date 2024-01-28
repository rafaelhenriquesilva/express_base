import { TokenUtil } from "../../utils/token.util";

let token = '';
describe('TokenUtil', () => {
    it('generate JWT TOKEN', async () => {
        let id = 1;
        token = await TokenUtil.generateToken(id);

        expect(token).not.toBeNull();
    });

    it('verify JWT TOKEN', async () => {
        let verify = await TokenUtil.verifyToken(token);

        expect(verify).toBeTruthy();
    });
    
    it('get id from token', async () => {
        let id = TokenUtil.getIdFromToken(token);

        expect(id).not.toBeNull();
        expect(id).toBe(1);
    });
});