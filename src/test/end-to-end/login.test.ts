import supertest from 'supertest';
import { App } from '../../app';
import { loginUser, loginWithInvalidUsername, loginWithInvalidPassword } from './helpers/login.helper';

const appInstance = new App();
const app = appInstance.exportApp();

const request = supertest(app);

describe('Login', () => {

  it('Login Success', async () => {
    const responseLogin = await loginUser(request);

    expect(responseLogin.status).toBe(200);
    expect(responseLogin.body).toHaveProperty('message');
    expect(responseLogin.body).toHaveProperty('user');
    expect(responseLogin.body).toHaveProperty('token');
    expect(responseLogin.body.message).toBe('User logged');
    expect(responseLogin.body.user).toHaveProperty('id');
    expect(responseLogin.body.user).toHaveProperty('username');
  }, 10000);

  it('Login with invalid username', async () => {
    const responseLogin = await loginWithInvalidUsername(request);

    expect(responseLogin.status).toBe(400);
    expect(responseLogin.body).toHaveProperty('errors');
  })

  it('Login with invalid password', async () => {
    const responseLogin = await loginWithInvalidPassword(request);

    expect(responseLogin.status).toBe(400);
    expect(responseLogin.body).toHaveProperty('errors');
  })
});



