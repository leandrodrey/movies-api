import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import {openapiSpecification} from '../swagger.js';

const docRouter = Router();

docRouter.use('/', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

export { docRouter };
