import { Request, Response, Router } from 'express';
import { UserAuthenticationService } from '../../service/user_authentication.service';
import { ValidatorUtil } from '../../utils/validator.util';


const userRoute = Router();

export class UserRoute {
  
  public async init() {
    userRoute.post('/create', ValidatorUtil.validatorFieldsNotEmpty(['username', 'password'], 'body') ,this.createUser);
  }

  public async createUser(request: Request, response: Response) {
    const userAuthenticationService = new UserAuthenticationService();
    await userAuthenticationService.createUser(request, response);
  }

  getRoute() {
    return userRoute;
  }
}

