import { Request, Response } from "express";
import UserAuthentication from "../entities/UserAuthentication";
import { UserAuthenticationHelper } from "../helpers/user_authentication.helper";
import { JwtUtil } from "../utils/jwt.util";
import { GlobalRepository } from "../repositories/global.repository";


export class UserAuthenticationService {
    constructor() { }

    async login(request: Request, response: Response) {
        try {
            const body = request.body;
            let errors: Array<string> = [];

            const globalRepository = new GlobalRepository(UserAuthentication);
            let user = await UserAuthenticationHelper.getUser(globalRepository, body);

            UserAuthenticationHelper.verifyUserExists(user, errors);
            UserAuthenticationHelper.verifyPassword(user, body, errors);

            if (errors.length > 0) {
                return response.status(400).json({
                    message: 'Error',
                    errors: errors
                });
            } else {
                response.status(200).json(user);
            }
        } catch (error: any) {
            response.status(500).json({ error: error.message });
        }

    }
}