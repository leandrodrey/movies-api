import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movies API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

export const openapiSpecification = swaggerJsdoc(options);
