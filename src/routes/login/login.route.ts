import { Request, Response, Router } from 'express';
import { UserAuthenticationService } from '../../service/user_authentication.service';
import { ValidatorUtil } from '../../utils/validator.util';
import { LoggerUtil } from '../../utils/logger.util';


const loginRoute = Router();

export class LoginRoute {
  
  public async init() {
    LoggerUtil.logInfo('Starting LoginRoute', 'routes/login/login.route.ts');
    loginRoute.post('/', ValidatorUtil.validatorFieldsNotEmpty(['username', 'password'], 'body') ,this.login);
  }

  public async login(request: Request, response: Response) {
    LoggerUtil.logInfo('Starting login', 'routes/login/login.route.ts');
    const userAuthenticationService = new UserAuthenticationService();
    await userAuthenticationService.login(request, response);
  }

  getRoute() {
    return loginRoute;
  }
}

