import UserAuthentication from "../entities/UserAuthentication";


export class UserAuthenticationHelper {

    static verifyUserExists(user: UserAuthentication[], errors: Array<string>) {
        if(user.length == 0){
            errors.push('User not found');
        }
    }

    static verifyPassword(user: UserAuthentication[], body: any, errors: Array<string>) {
        if(user == null || user == undefined || user.length == 0){
            errors.push('Invalid password');
        } else if(user[0].password != body.password){
            errors.push('Invalid password');
        }
    }

    static async  getUser(globalRepository: any, body: any){
        let user = await globalRepository.getDataByParameters({
            username: body.username
        }) as UserAuthentication[];
        return user;
    }
}