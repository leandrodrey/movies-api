const express = require('express');
const movies = require('./movies.json');
const uuid = require('uuid');
const cors = require('cors');
const {validateMovie, validatePartialMovie} = require("./movies");

const PORT = process.env.PORT ?? 3000;

const app = express();
app.disable('x-powered-by');
app.use(cors(
    {
        origin: (origin, callback) => {
            const ACCEPTED_ORIGINS = ['http://localhost:3000', 'https://example.com'];
            if (ACCEPTED_ORIGINS.includes(origin)) {
                return callback(null, true);
            }
            if (!origin) {
                return callback(null, true);
            }
            return callback(new Error('Not allowed by CORS'));
        }
    }
));
app.use(express.json());

app.get('/movies', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')

    const {genre} = req.query;
    if (genre) {
        const filteredMovies = movies.filter((movie) => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()));
        return res.json(filteredMovies);
    }
    res.json(movies);
});

app.get('/movies/:id', (req, res) => {
    const {id} = req.params;
    const movie = movies.find((movie) => movie.id === id);
    if (!movie) {
        return res.status(404).send('Movie not found');
    }
    res.json(movie);
});

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body);

    if (result.error) {
        return res.status(400).json({error: JSON.parse(result.error.message)});
    }

    const newMovie = {
        id: uuid.v4(),
        ...result.data,
    };

    movies.push(newMovie);
});

app.patch('/movies/:id', (req, res) => {
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

app.delete('/movies/:id', (req, res) => {
    const {id} = req.params;
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
        return res.status(404).send('Movie not found');
    }

    movies.splice(movieIndex, 1);
    res.send('Movie deleted');
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
