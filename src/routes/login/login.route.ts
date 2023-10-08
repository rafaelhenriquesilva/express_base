import { Request, Response, Router } from 'express';
import { UserAuthenticationService } from '../../service/user_authentication.service';
import { ValidatorUtil } from '../../utils/validator.util';


const loginRoute = Router();

export class LoginRoute {
  
  public async init() {
    loginRoute.post('/', ValidatorUtil.validatorFieldsNotEmpty(['username', 'password'], 'body') ,this.login);
  }

  public async login(request: Request, response: Response) {
    const userAuthenticationService = new UserAuthenticationService();
    await userAuthenticationService.login(request, response);
  }

  getLoginRoute() {
    return loginRoute;
  }
}

