import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

const docRouter = Router();

docRouter.get('/', swaggerUi.setup());
