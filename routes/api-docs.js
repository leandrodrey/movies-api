import { Router } from 'express'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const docRouter = Router()

docRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));
