import dotenv from 'dotenv'
import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session';
import { corsMiddleware } from './middlewares/cors.js'
import { tokenCookie } from './middlewares/token-cookies.js'
import { docRouter } from './routes/api-docs.js'
import { createMoviesRouter } from './routes/movies.js'
import { createAuthRouter } from './routes/auth.js'
import { MovieModel } from './models/mysql/movie.js'
import { AuthModel } from './models/mysql/auth.js'

dotenv.config()
const app = express()

app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET ?? 'secret test to use in local',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true, // Protect against XSS attacks
        sameSite: 'strict'  // Restrict to first-party context
    }
}));
app.use(tokenCookie())
app.use('/api-docs', docRouter)
app.use('/movies', createMoviesRouter({ movieModel: MovieModel }))
app.use('/auth', createAuthRouter({ authModel: AuthModel }))

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})

app.use((req, res) => {
    res.status(404).send('Not Found')
})
