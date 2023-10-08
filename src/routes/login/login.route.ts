import { Request, Response, Router } from 'express';
import { CrudFactory } from '../../factories/CrudFactory';
import { UserAuthenticationService } from '../../service/user_authentication.service';

const loginRoute = Router();

export class LoginRoute extends CrudFactory {
  
  public async init() {
    loginRoute.post('/', this.validatorFieldsNotEmpty(['username', 'password'], 'body') ,this.login);
  }

  public async login(request: Request, response: Response) {
    const userAuthenticationService = new UserAuthenticationService();
    await userAuthenticationService.login(request, response);
  }

  getLoginRoute() {
    return loginRoute;
  }
}

