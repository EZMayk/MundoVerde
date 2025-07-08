import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Clima Mundo Verde API',
      version: '1.0.0',
      description: 'API para consultar información climática de diferentes ciudades usando múltiples fuentes de datos.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    tags: [
      {
        name: 'Autenticación',
        description: 'Endpoints para autenticación de usuarios',
      },
      {
        name: 'Consulta Clima',
        description: 'Endpoints para consultar información climática',
      },
      {
        name: 'Fuentes Climáticas',
        description: 'Endpoints para gestionar fuentes de datos climáticos',
      },
      {
        name: 'Logs del Sistema',
        description: 'Endpoints para consultar logs del sistema',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/dtos/*.ts'], // Archivos donde están las anotaciones
};

export const swaggerSpec = swaggerJSDoc(options);
