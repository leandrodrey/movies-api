import cors from "cors";

const ACCEPTED_ORIGINS = [
    process.env.VERCEL_URL,
    'http://localhost:63342',
    'http://localhost:3000',
    'https://codo-a-codo-js-api-front.vercel.app',
    'https://moviesfront.elsuperhard.com'
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors(
    {
        origin: (origin, callback) => {

            if (acceptedOrigins.includes(origin)) {
                return callback(null, true);
            }

            if (!origin) {
                return callback(null, true);
            }

            return callback(new Error('Not allowed by CORS'));
        }
    }
);
