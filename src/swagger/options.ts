import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shopper Viagens API',
      version: '1.0.0',
    }
  },
  apis: ['./src/routes/*.ts'], 
};

export const openapiSpecification = swaggerJsdoc(options);