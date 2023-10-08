import basicAuth from 'express-basic-auth';
// Middleware de autenticação personalizado para o Swagger
export const swaggerAuthMiddleware = basicAuth({
    users: { [process.env.SWAGGER_USERNAME as string]: process.env.SWAGGER_PASSWORD as string },
    challenge: true,
    realm: 'Swagger UI',
  });