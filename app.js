import express, {json} from 'express';
import {corsMiddleware} from "./middlewares/cors.js";
import {createMoviesRouter} from './routes/movies.js';
import {MovieModel} from "./models/mysql/movie.js";
import swaggerUi from 'swagger-ui-express';
import { openapiSpecification } from './swagger.js';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.disable('x-powered-by');
app.use(json());
app.use(corsMiddleware());
app.use('/movies', createMoviesRouter({movieModel: MovieModel}));

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});
