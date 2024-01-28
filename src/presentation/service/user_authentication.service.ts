import { Request, Response } from "express";
import UserAuthentication from "../../infra/data-access/entities/UserAuthentication";
import { UserAuthenticationUtil } from "../../utils/user_authentication.util";
import { TokenUtil } from "../../utils/token.util";
import { GlobalRepository } from "../../infra/data-access/repositories/typeOrm/global.repository";
import { PasswordUtil } from "../../utils/password.util";
import { ResponseUtil } from "../../utils/response.util";
import { LoggerUtil } from "../../utils/logger.util";

export class UserAuthenticationService {
    globalRepository = new GlobalRepository(UserAuthentication);
    constructor() { 
        LoggerUtil.logInfo('Starting UserAuthenticationService', 'service/user_authentication.service.ts');
    }

    async createUser(request: Request, response: Response) {
        try {
            const body = request.body;
            LoggerUtil.logInfo(`Starting createUser: ${JSON.stringify(body)}`, 'service/user_authentication.service.ts');
            let errors: Array<string> = [];

            let user = await UserAuthenticationUtil.getDataWhereCondition(UserAuthentication, { username: body.username }) as UserAuthentication[];

            UserAuthenticationUtil.verifyUserExists(user, errors);
            
           
            let callback = async () => {
                let encryptPassword = await PasswordUtil.creatHashPassword(body.password) as string;

                let data = UserAuthenticationUtil.createUserData(body, encryptPassword) as UserAuthentication;
                
                let newUser = await this.globalRepository.createData(data) as UserAuthentication;
                LoggerUtil.logInfo(`Finishing createUser: ${JSON.stringify(newUser)}`, 'service/user_authentication.service.ts');
                response.status(200).json(newUser);
            }
            
            ResponseUtil.showErrorsOrExecuteFunction(errors, response, callback);
        
        } catch (error: any) {
            LoggerUtil.logError(`Error: ${error.message}`, 'service/user_authentication.service.ts', 'createUser');
            response.status(500).json({ error: error.message });
        }
    }

    async login(request: Request, response: Response) {
        try {
            const body = request.body;
            LoggerUtil.logInfo(`Starting login: ${JSON.stringify(body)}`, 'service/user_authentication.service.ts');
            let errors: Array<string> = [];

            let user = await UserAuthenticationUtil.getDataWhereCondition(UserAuthentication, { username: body.username }) as UserAuthentication[];

            UserAuthenticationUtil.verifyUserNotExists(user, errors);

            UserAuthenticationUtil.verifyUserIsActive(user, errors);

            await UserAuthenticationUtil.verifyPasswordIsMatch(user, body, errors);

            let callback = async () => {
                let token = await TokenUtil.generateToken(user[0].id) as string;

                let dataToUpdate = {
                    token: token
                } as UserAuthentication;

                //Update token user
                await UserAuthenticationUtil.updateData(UserAuthentication, { id: user[0].id }, dataToUpdate) as UserAuthentication;
                LoggerUtil.logInfo(`Finishing login: ${JSON.stringify(user)}`, 'service/user_authentication.service.ts');
                response.status(200).json({
                    message: 'Login realizado com sucesso!',
                    token: token
                });
            };

            ResponseUtil.showErrorsOrExecuteFunction(errors, response, callback);
        } catch (error: any) {
            LoggerUtil.logError(`Error: ${error.message}`, 'service/user_authentication.service.ts', 'login');
            response.status(500).json({ error: error.message });
        }

    }

    async updatePassword(request: Request, response: Response) {
       try {
        const { username, new_password } = request.body;
        LoggerUtil.logInfo(`Starting updatePassword: ${JSON.stringify(request.body)}`, 'service/user_authentication.service.ts');
        let errors: Array<string> = [];

        let user = await UserAuthenticationUtil.getDataWhereCondition(UserAuthentication, { username: username }) as UserAuthentication[];

        UserAuthenticationUtil.verifyUserNotExists(user, errors);

        UserAuthenticationUtil.verifyUserIsActive(user, errors);

        let callback = async () => {
            let encryptPassword = await PasswordUtil.creatHashPassword(new_password) as string;

            let dataToUpdate = {
                password: encryptPassword
            } as UserAuthentication;

            let whereCondition = {
                id: user[0].id
            } as any;

            let updatedUser = await UserAuthenticationUtil.updateData(UserAuthentication, whereCondition, dataToUpdate) as UserAuthentication;
            LoggerUtil.logInfo(`Finishing updatePassword: ${JSON.stringify(updatedUser)}`, 'service/user_authentication.service.ts');
            response.status(200).json(updatedUser);
        }

        

        ResponseUtil.showErrorsOrExecuteFunction(errors, response, callback);
       } catch(error: any) {
        LoggerUtil.logError(`Error: ${error.message}`, 'service/user_authentication.service.ts', 'updatePassword');
        response.status(500).json({ error: error.message });
       }
    }
}