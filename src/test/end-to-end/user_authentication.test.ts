import supertest from 'supertest';
import { App } from '../../app';
import { loginUser, loginWithInvalidUsername, loginWithInvalidPassword } from './helpers/login.helper';
import { GlobalRepository } from '../../repositories/global.repository';
import UserAuthentication from '../../entities/UserAuthentication';

const appInstance = new App();
const app = appInstance.exportApp();

const request = supertest(app);
const globalRepository = new GlobalRepository(UserAuthentication);

let userCredentials = {
  username: process.env.USER_TEST_USERNAME,
  password: process.env.USER_TEST_PASSWORD
} as any;

describe('User', () => {

  beforeEach(() => {
     jest.clearAllMocks();
  });

  it('Create user', async () => {
    
    let userAlreadyExist = await globalRepository
          .getDataByParameters({username: userCredentials.username}) as UserAuthentication[];

    if(userAlreadyExist.length > 0) {
      await globalRepository.deleteData(userAlreadyExist[0].id);
    }

    const user = await request.post('/user/create')
      .send({
        "username": process.env.USER_TEST_USERNAME,
        "password": process.env.USER_TEST_PASSWORD
      })
      .set('Content-Type', 'application/json'); // Set the content-type header

      expect(user.body).not.toBeNull();
      expect(user.body.username).toBe(userCredentials.username);
      expect(user.body.password).not.toBe(userCredentials.password);
  }, 10000);

  it('Login user', async () => {
    const user = await loginUser(request);

    expect(user.body).not.toBeNull();
    expect(user.body.token).not.toBeNull();
  }, 10000);

 
});



