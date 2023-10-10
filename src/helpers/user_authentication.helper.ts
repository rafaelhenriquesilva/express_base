import UserAuthentication from "../entities/UserAuthentication";
import { GlobalRepository } from "../repositories/global.repository";
import { PasswordUtil } from "../utils/password.util";

export class UserAuthenticationHelper {

    static verifyUserNotExists(user: UserAuthentication[], errors: Array<string>) {
        if(user.length == 0){
            errors.push('User not found');
        } 
    }

    static async verifyUserExists(user: UserAuthentication[], errors: Array<string>) {
        if(user.length > 0){
            errors.push('User already exists');
        }
    }

    static async verifyPasswordIsMatch(user: UserAuthentication[], body: any, errors: Array<string>) {
        if (user.length > 0 && user[0].is_active) {
            //Compare password
            let comparePassword = await PasswordUtil.comparePassword(body.password, user[0].password);

            if (!comparePassword) {
                errors.push('Password not match');
            }
        }
    }

    static async  getDataWhereCondition(model: any, whereCondition: any){
        let globalRepository = new GlobalRepository(model);
        let data = await globalRepository.getDataByParameters(
            whereCondition
        );
        return data;
    }

    static async verifyUserIsActive(user: UserAuthentication[], errors: Array<string>) {
        if(user.length > 0 && !user[0].is_active){
            errors.push('User not active');
        }
    }

    static async updateData(model: any, whereCondition: any, data: any){
        let globalRepository = new GlobalRepository(model);
        let dataUpdated = await globalRepository.updateData(data, whereCondition);
        return dataUpdated;
    }

    static async verifyPasswordHaveMinimumLength(password: string, errors: Array<string>) {
        if (password.length < 8) {
            errors.push('Password must have minimum length of 8 characters');
        }
    }

    static createUserData(body: any, encryptPassword: string){
        let data = {
            username: body.username,
            password: encryptPassword,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        } as UserAuthentication;
        return data;
    }
}