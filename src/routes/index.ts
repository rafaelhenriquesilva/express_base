import express from 'express';
import { HealthRoute } from './health/health.route';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { LoginRoute } from './login/login.route';


export const routes = express.Router();
  
// Rota do Swagger com autenticação
routes.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// // ROTA PARA EXPORTAR O DOC DO SWAGGER
routes.get('/json-to-export', (req, res) => {
    res.json(swaggerDocument);
});

const healthRoute = new HealthRoute();
const loginRoute = new LoginRoute();
// Chame os método init diretamente, não precisa de uma função anônima
healthRoute.init();
loginRoute.init();


routes.use('/health', healthRoute.getHealthRoute());
routes.use('/login', loginRoute.getLoginRoute());