import z from "zod";

const movieSchema = z.object({
    title: z.string(
        {
            required_error: 'Title is required'
        }
    ),
    year: z.number().int().min(1900).max(2025),
    duration: z.number().int().positive(),
    poster: z.string().url(),
    rate: z.number().min(1).max(10).optional().default(5),
    trailer: z.string().url().optional(),
    status: z.enum(['Rumored', 'Planned', 'In Production', 'Post Production', 'Released', 'Canceled']).optional().default('Released'),
    budget: z.number().int().positive().optional(),
    revenue: z.number().int().positive().optional(),
    genres: z.array(z.string()).optional(),
    actors: z.array(z.string()).optional(),
    directors: z.array(z.string()).optional(),
    overview: z.string().optional()
});

function validateMovie(movie) {
    return movieSchema.safeParse(movie);
}

function validatePartialMovie(movie) {
    return movieSchema.partial().safeParse(movie);
}

export {validateMovie, validatePartialMovie};
