import { Request, Response } from "express";
import UserAuthentication from "../entities/UserAuthentication";
import { UserAuthenticationHelper } from "../helpers/user_authentication.helper";
import { JwtUtil } from "../utils/jwt.util";
import { GlobalRepository } from "../repositories/global.repository";
import { PasswordUtil } from "../utils/password.util";
import { ResponseUtil } from "../utils/response.util";

export class UserAuthenticationService {
    globalRepository = new GlobalRepository(UserAuthentication);
    constructor() { }

    async createUser(request: Request, response: Response) {
        try {
            const body = request.body;
            let errors: Array<string> = [];

            let user = await UserAuthenticationHelper.getDataWhereCondition(UserAuthentication, { username: body.username }) as UserAuthentication[];

            UserAuthenticationHelper.verifyUserExists(user, errors);

            let encryptPassword = await PasswordUtil.creatHashPassword(body.password) as string;

            let data = UserAuthenticationHelper.createUserData(body, encryptPassword) as UserAuthentication;
            
            let newUser = await this.globalRepository.createData(data) as UserAuthentication;

            let callback = async () => response.status(200).json(newUser);

            ResponseUtil.showErrorsOrExecuteFunction(errors, response, callback);
        
        } catch (error: any) {
            console.error(`
                Origin: user_authentication.service.createUser
                Error: ${error.message}
                Stack: ${error.stack}
            `);
            response.status(500).json({ error: error.message });
        }
    }

    async login(request: Request, response: Response) {
        try {
            const body = request.body;
            let errors: Array<string> = [];

            let user = await UserAuthenticationHelper.getDataWhereCondition(UserAuthentication, { username: body.username }) as UserAuthentication[];

            UserAuthenticationHelper.verifyUserNotExists(user, errors);

            UserAuthenticationHelper.verifyUserIsActive(user, errors);

            await UserAuthenticationHelper.verifyPasswordIsMatch(user, body, errors);

            let callback = async () => {
                let token = await JwtUtil.generateJwtToken(user[0].id) as string;

                let dataToUpdate = {
                    token: token
                } as UserAuthentication;

                //Update token user
                await UserAuthenticationHelper.updateData(UserAuthentication, { id: user[0].id }, dataToUpdate) as UserAuthentication;

                response.status(200).json({
                    message: 'Login realizado com sucesso!',
                    token: token
                });
            };

            ResponseUtil.showErrorsOrExecuteFunction(errors, response, callback);
        } catch (error: any) {
            console.error(`
                Origin: user_authentication.service.login
                Error: ${error.message}
                Stack: ${error.stack}
            `);
            response.status(500).json({ error: error.message });
        }

    }

    async updatePassword(request: Request, response: Response) {
       try {
        const { username, new_password } = request.body;
        let errors: Array<string> = [];

        let user = await UserAuthenticationHelper.getDataWhereCondition(UserAuthentication, { username: username }) as UserAuthentication[];

        UserAuthenticationHelper.verifyUserNotExists(user, errors);

        UserAuthenticationHelper.verifyUserIsActive(user, errors);

        UserAuthenticationHelper.verifyPasswordHaveMinimumLength(new_password, errors);

        let callback = async () => {
            let encryptPassword = await PasswordUtil.creatHashPassword(new_password) as string;

            let dataToUpdate = {
                password: encryptPassword
            } as UserAuthentication;

            let whereCondition = {
                id: user[0].id
            } as any;

            let updatedUser = await UserAuthenticationHelper.updateData(UserAuthentication, whereCondition, dataToUpdate) as UserAuthentication;

            response.status(200).json(updatedUser);
        }

        ResponseUtil.showErrorsOrExecuteFunction(errors, response, callback);
       } catch(error: any) {
        console.error(`
            Origin: user_authentication.service.updatePassword
            Error: ${error.message}
            Stack: ${error.stack}
        `);
        response.status(500).json({ error: error.message });
       }
    }
}