import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import {openapiSpecification} from '../swagger.js';

const docRouter = Router();

docRouter.use('/api-docs', swaggerUi.serve);
docRouter.get('/', swaggerUi.setup(openapiSpecification));

export { docRouter };
