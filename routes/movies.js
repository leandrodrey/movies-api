import {Router} from 'express';
import {MoviesController} from "../controllers/movies.js";

export const createMoviesRouter = ({movieModel}) => {
    const moviesRouter = Router();
    const moviesController = new MoviesController({movieModel});

    moviesRouter.get('/', moviesController.getAll);
    moviesRouter.post('/', moviesController.create);

    moviesRouter.get('/:id', moviesController.getById);
    moviesRouter.delete('/:id', moviesController.delete);
    moviesRouter.patch('/:id', moviesController.update);

    return moviesRouter;
}
