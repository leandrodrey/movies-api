const z = require("zod");

const movieSchema = z.object({
    title: z.string(
        {
            required_error: 'Title is required'
        }
    ),
    year: z.number().int().min(1900).max(2025),
    director: z.string(),
    duration: z.number().int().positive(),
    poster: z.string().url(),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Sci-Fi', 'Thriller']),
        {
            invalid_type_error: 'Genre must be an array of strings',
            required_error: 'Genre is required',
            invalid_enum_error: 'Invalid genre',
        }
    ),
    rate: z.number().min(1).max(10).optional().default(5)
});

function validateMovie(movie) {
    return movieSchema.safeParse(movie);
}

function validatePartialMovie(movie) {
    return movieSchema.partial().safeParse(movie);
}

module.exports = {
    validateMovie,
    validatePartialMovie
}
