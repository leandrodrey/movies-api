import {validateMovie, validatePartialMovie} from "../schemas/movies.js";

export class MoviesController {

    constructor({movieModel}) {
        this.movieModel = movieModel;
    }

    getAll = async (req, res) => {
        const { genre, sortOrder = 'asc' } = req.query
        try {
            const movies = await this.movieModel.getAll({ genre, sortOrder })
            if (!movies) {
                return res.status(404).send('Movies not found')
            }
            res.json(movies)
        } catch (error) {
            console.error(error)
            res.status(500).send('Internal server error')
        }
    }

    getById = async (req, res) =>{
        const {id} = req.params;
        const movie = await this.movieModel.getById({id});
        if (!movie) {
            return res.status(404).send('Movie not found');
        }
        res.json(movie);
    }

    create = async (req, res) => {
        const result = validateMovie(req.body);
        if (result.error) {
            return res.status(400).json({error: JSON.parse(result.error.message)});
        }
        const newMovie = await this.movieModel.create({input: result.data});
        res.status(201).json(newMovie);
    }

    delete = async (req, res) => {
        const {id} = req.params;
        const result = await this.movieModel.delete({id});
        if (!result) {
            return res.status(404).send('Movie not found');
        }
        res.send('Movie deleted');
    }

    update = async (req, res) => {
        const {id} = req.params;
        const result = validatePartialMovie(req.body);
        if (result.error) {
            return res.status(400).json({error: JSON.parse(result.error.message)});
        }
        const updatedMovie = await this.movieModel.update({id, input: result.data});
        if (!updatedMovie) {
            return res.status(404).send('Movie not found');
        }
        res.json(updatedMovie);
    }

}
