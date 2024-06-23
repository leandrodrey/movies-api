import {Router} from 'express';
import {readJSON} from '../utils/utils.js';
import {validateMovie, validatePartialMovie} from "../schemas/movies.js";
import {v4 as uuidv4} from "uuid";

const movies = readJSON('./movies.json');
export const moviesRouter = Router();

moviesRouter.get('/', (req, res) => {
    const {genre} = req.query;
    if (genre) {
        const filteredMovies = movies.filter((movie) => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()));
        return res.json(filteredMovies);
    }
    res.json(movies);
});

moviesRouter.get('/:id', (req, res) => {
    const {id} = req.params;
    const movie = movies.find((movie) => movie.id === id);
    if (!movie) {
        return res.status(404).send('Movie not found');
    }
    res.json(movie);
});

moviesRouter.post('/', (req, res) => {
    const result = validateMovie(req.body);
    if (result.error) {
        return res.status(400).json({error: JSON.parse(result.error.message)});
    }
    const newMovie = {
        id: uuidv4(),
        ...result.data,
    };
    movies.push(newMovie);
});

moviesRouter.delete('/:id', (req, res) => {
    const {id} = req.params;
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
        return res.status(404).send('Movie not found');
    }
    movies.splice(movieIndex, 1);
    res.send('Movie deleted');
});

moviesRouter.patch('/:id', (req, res) => {
    const {id} = req.params;
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
        return res.status(404).send('Movie not found');
    }

    const result = validatePartialMovie(req.body);

    const updatedMovie = {
        ...movies[movieIndex],
        ...result.data,
    };

    res.json(movies[movieIndex]);
});
