import z from 'zod'

const userSchema = z.object({
    name: z.string().min(2),
    lastname: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    country: z.string().min(2),
})

function validateUser (user) {
    return userSchema.safeParse(user)
}

function validatePartialUser (user) {
    return userSchema.partial().safeParse(user)
}

export { validateUser, validatePartialUser }
