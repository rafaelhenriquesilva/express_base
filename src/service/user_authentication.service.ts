import { Request, Response } from "express";
import { RepositoryUtil } from "../utils/repository.util";
import UserAuthentication from "../entities/UserAuthentication";
import { UserAuthenticationHelper } from "../helpers/user_authentication.helper";

export class UserAuthenticationService {
    constructor() { }

    async login(request: Request, response: Response) {
        try {
            const body = request.body;
            let errors: Array<string> = [];

            const repositoryUtil = new RepositoryUtil(UserAuthentication);
            let user = await repositoryUtil.getRecordsByParameters({
                username: body.username
            }) as UserAuthentication[];

            UserAuthenticationHelper.verifyUserExists(user, errors);
            UserAuthenticationHelper.verifyPassword(user, body, errors);

            if (errors.length > 0) {
                return response.status(400).json({
                    message: 'Error',
                    errors: errors
                });
            } else {
                response.status(200).json({
                    message: 'User logged',
                    user: user[0],
                    token: 'token'
                });
            }
        } catch (error: any) {
            response.status(500).json({ error: error.message });
        }

    }
}