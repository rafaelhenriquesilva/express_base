import express from 'express';
import { HealthRoute } from './health/health.route';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';


import UserAuthentication from '../entities/UserAuthentication';
import { RepositoryUtil } from '../utils/repository.util';


export const routes = express.Router();
  
// Rota do Swagger com autenticação
routes.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// // ROTA PARA EXPORTAR O DOC DO SWAGGER
routes.get('/json-to-export', (req, res) => {
    res.json(swaggerDocument);
});
const healthRoute = new HealthRoute();
// Chame os método init diretamente, não precisa de uma função anônima
healthRoute.init();

routes.use('/users', (req, res) => {
    const repositoryUtil = new RepositoryUtil(UserAuthentication);
    repositoryUtil.getRecordsByParameters({}).then((result) => {
        res.json(result);
    });
});

routes.use('/health', healthRoute.getHealthRoute());