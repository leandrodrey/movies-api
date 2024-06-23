import {readJSON} from "../utils/utils.js";
import {v4 as uuidv4} from "uuid";

const movies = readJSON('./movies.json');

export class MovieModel {

    static async getAll({genre}) {
        if (genre) {
            return movies.filter((movie) => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()));
        }
        return movies;
    }

    static async getById(id) {
        return movies.find((movie) => movie.id === id);
    }

    static async create({input}) {
        const newMovie = {
            id: uuidv4(),
            ...input,
        };
        movies.push(newMovie);
        return newMovie;
    }

    static async delete({id}) {
        const movieIndex = movies.findIndex((movie) => movie.id === id);
        if (movieIndex === -1) {
            return false;
        }
        movies.splice(movieIndex, 1);
        return true;
    }

    static update({id, input}) {
        const movieIndex = movies.findIndex((movie) => movie.id === id);
        if (movieIndex === -1) {
            return false;
        }

        movies[movieIndex] = {
            ...movies[movieIndex],
            ...input,
        };

        return  movies[movieIndex];
    }

}
