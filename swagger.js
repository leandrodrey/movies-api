import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movies API',
      version: '1.0.0',
      description: 'API for managing movie data.',
    }
  },
  apis: ['./routes/*.js'], // Path to the API routes files
};

export const openapiSpecification = swaggerJsdoc(options);
