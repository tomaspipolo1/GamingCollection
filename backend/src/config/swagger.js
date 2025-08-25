// ===== CONFIGURACIÓN DE SWAGGER =====
// Configuración de Swagger para documentación y testing de la API

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración básica de Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: '🎮 Gaming Collection API',
        version: '1.0.0',
        description: 'API REST para gestión de colecciones de videojuegos',
        contact: {
            name: 'Estudiante ADR',
            email: 'estudiante@facultad.edu'
        },
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT'
        }
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Servidor de desarrollo'
        },
        {
            url: 'https://gaming-collection-api.azurewebsites.net',
            description: 'Servidor de producción (Azure)'
        }
    ],
    tags: [
        {
            name: 'Genres',
            description: 'Operaciones relacionadas con géneros de videojuegos'
        },
        {
            name: 'Games',
            description: 'Operaciones relacionadas con videojuegos'
        },
        {
            name: 'System',
            description: 'Endpoints del sistema'
        }
    ]
};

// Opciones para swagger-jsdoc
const swaggerOptions = {
    swaggerDefinition,
    // Rutas donde buscar las anotaciones de Swagger
    apis: [
        './src/routes/*.js',
        './src/models/*.js',
        './server.js'
    ]
};

// Generar la especificación de Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Configuración personalizada de Swagger UI
const swaggerUiOptions = {
    customCss: `
        .swagger-ui .topbar { 
            background-color: #1a1a2e; 
        }
        .swagger-ui .topbar .download-url-wrapper input[type=text] { 
            border: 2px solid #16213e; 
        }
        .swagger-ui .info .title { 
            color: #16a085; 
        }
        .swagger-ui .scheme-container { 
            background: #0f3460; 
            box-shadow: 0 1px 2px 0 rgba(0,0,0,0.15); 
        }
        .swagger-ui .opblock.opblock-post { 
            border-color: #16a085; 
            background: rgba(22, 160, 133, 0.1); 
        }
        .swagger-ui .opblock.opblock-get { 
            border-color: #3498db; 
            background: rgba(52, 152, 219, 0.1); 
        }
        .swagger-ui .opblock.opblock-put { 
            border-color: #f39c12; 
            background: rgba(243, 156, 18, 0.1); 
        }
        .swagger-ui .opblock.opblock-delete { 
            border-color: #e74c3c; 
            background: rgba(231, 76, 60, 0.1); 
        }
    `,
    customSiteTitle: '🎮 Gaming Collection API',
    customfavIcon: '/assets/favicon.ico',
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'list',
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha'
    }
};

module.exports = {
    swaggerSpec,
    swaggerUi,
    swaggerUiOptions
};
