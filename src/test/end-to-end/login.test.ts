import supertest from 'supertest';
import { App } from '../../app';
import { loginUser, loginWithInvalidUsername, loginWithInvalidPassword } from './helpers/login.helper';

const appInstance = new App();
const app = appInstance.exportApp();

const request = supertest(app);

describe('Login', () => {

  beforeEach(() => {});

  it('Login Success', async () => {
    const responseLogin = await loginUser(request);

    expect(responseLogin.status).toBe(200);
    expect(responseLogin.body[0]).toHaveProperty('id');
    expect(responseLogin.body[0]).toHaveProperty('username');
    expect(responseLogin.body[0]).toHaveProperty('password');
    expect(responseLogin.body[0]).toHaveProperty('token');

  }, 10000);

 
});



