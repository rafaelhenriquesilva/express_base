import { Request, Response } from "express";
import UserAuthentication from "../entities/UserAuthentication";
import { UserAuthenticationHelper } from "../helpers/user_authentication.helper";
import { JwtUtil } from "../utils/jwt.util";
import { GlobalRepository } from "../repositories/global.repository";
import { PasswordUtil } from "../utils/password.util";


export class UserAuthenticationService {
    globalRepository = new GlobalRepository(UserAuthentication);
    constructor() { }

    async createUser(request: Request, response: Response) {
        try {
            const body = request.body;
            let errors: Array<string> = [];

            let user = await this.globalRepository.getDataByParameters({ username: body.username }) as UserAuthentication[];

            if (user.length > 0) {
                errors.push('User already exists');
            }

            let encryptPassword = await PasswordUtil.creatHashPassword(body.password);

            let data = {
                username: body.username,
                password: encryptPassword,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            } as UserAuthentication;


            let newUser = await this.globalRepository.createData(data);

            if (errors.length > 0) {
                return response.status(400).json({
                    message: 'Error',
                    errors: errors
                });
            } else {
                response.status(200).json(newUser);
            }


        } catch (error: any) {
            response.status(500).json({ error: error.message });
        }
    }

    async login(request: Request, response: Response) {
        try {
            const body = request.body;
            let errors: Array<string> = [];

            let user = await this.globalRepository.getDataByParameters({ username: body.username }) as UserAuthentication[];

            if (user.length === 0) {
                errors.push('User not found');
            }

            if (user.length > 0 && !user[0].is_active) {
                errors.push('User not active');
            } else if (user.length > 0 && user[0].is_active) {
                //Compare password
                let comparePassword = await PasswordUtil.comparePassword(body.password, user[0].password);

                if (!comparePassword) {
                    errors.push('Password not match');
                }
            }

            if (errors.length > 0) {
                return response.status(400).json({
                    message: 'Error',
                    errors: errors
                });
            } else {
                let token = await JwtUtil.generateJwtToken(user[0].id);

                let dataToUpdate = {
                    token: token
                } as UserAuthentication;


                //Update token user
                let updateUser = await this.globalRepository.updateData(dataToUpdate, { id: user[0].id }) as any;

                response.status(200).json(updateUser);
            }
        } catch (error: any) {
            response.status(500).json({ error: error.message });
        }

    }

    async updatePassword(request: Request, response: Response) {
        const {username, new_password} = request.body;
        let errors: Array<string> = [];

        let user = await this.globalRepository.getDataByParameters({ username: username }) as UserAuthentication[];

        if (user.length === 0) {
            errors.push('User not found');
        }

        if (user.length > 0 && !user[0].is_active) {
            errors.push('User not active');
        } 
        
        if (errors.length > 0) {
            return response.status(400).json({
                message: 'Error',
                errors: errors
            });
        } else {
            
            if(new_password.length < 8) {
                return response.status(400).json({
                    message: 'Error',
                    errors: ['Password must be at least 8 characters long']
                });
            }

            let encryptPassword = await PasswordUtil.creatHashPassword(new_password);

            let dataToUpdate = {
                password: encryptPassword
            } as UserAuthentication;

            let whereCondition = {
                id: user[0].id
            } as any;

            let updatedUser = await this.globalRepository.updateData(dataToUpdate, whereCondition) as any;

            response.status(200).json(updatedUser);
        }
    }
}