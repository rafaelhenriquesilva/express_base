import express from 'express';
import { HealthRoute } from './health/health.route';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { LoginRoute } from './login/login.route';
import { RouterConfigDto } from '../dtos/router_config.dto';


export const routes = express.Router();
  
// Rota do Swagger com autenticação
routes.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// // ROTA PARA EXPORTAR O DOC DO SWAGGER
routes.get('/json-to-export', (req, res) => {
    res.json(swaggerDocument);
});

/**
 * Instanciando as rotas
 */
new RouterConfigDto(new HealthRoute(), 'init', '/health', routes);
new RouterConfigDto(new LoginRoute(), 'init', '/login', routes);

