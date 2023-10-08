export const loginUser = (request: any) => {
    return request.post('/login')
      .send({
        "username": process.env.USER_TEST_USERNAME,
        "password": process.env.USER_TEST_PASSWORD
      })
      .set('Content-Type', 'application/json'); // Set the content-type header
  }

export const loginWithInvalidUsername = (request: any) => {
    return request.post('/login')
      .send({
        "username": 'invalid_username',
        "password": process.env.USER_TEST_PASSWORD
      })
      .set('Content-Type', 'application/json'); // Set the content-type header
  }

  export const loginWithInvalidPassword = (request: any) => {
    return request.post('/login')
      .send({
        "username": process.env.USER_TEST_USERNAME,
        "password": 'invalid_password'
      })
      .set('Content-Type', 'application/json'); // Set the content-type header
  }