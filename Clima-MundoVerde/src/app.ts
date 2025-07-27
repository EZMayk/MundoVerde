import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import * as dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.route';
import consultaClimaRoutes from './routes/ConsultaClima.route';
import fuenteRoutes from './routes/FuenteClimatica.route';
import logRoutes from './routes/LogSistema.routes';
import healthRoutes from './routes/health.route';
import { verificarToken } from './middlewares/auth.middleware';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { WebSocketService } from './websocket/websocket.service';

const app = express();
const server = createServer(app);

// Configurar CORS
const corsOptions = {
    origin: ['http://localhost:3001', 'http://127.0.0.1:3001', 'http://localhost:3000', 'http://localhost:9000', 'http://localhost:4000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));

// Middlewares para parsear JSON y URL-encoded con configuración mejorada
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf, encoding) => {
    // Solo logear si hay debugging habilitado
    if (process.env.DEBUG_REQUESTS === 'true') {
      console.log('Raw body length:', buf.length);
    }
  }
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb'
}));

// Middleware para manejar errores de parsing del body
app.use((error: any, req: any, res: any, next: any) => {
  if (error instanceof SyntaxError && 'body' in error) {
    console.error('Error parsing JSON:', error.message);
    return res.status(400).json({ 
      error: 'Invalid JSON format',
      message: error.message 
    });
  }
  if (error.type === 'entity.parse.failed') {
    console.error('Entity parse failed:', error.message);
    return res.status(400).json({ 
      error: 'Invalid request body',
      message: 'Failed to parse request body' 
    });
  }
  next(error);
});

// Middleware de debugging para capturar información de las peticiones
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Content-Length:', req.headers['content-length']);
  
  // Solo logear detalles del body si hay debugging habilitado
  if (process.env.DEBUG_REQUESTS === 'true') {
    console.log('Body type:', typeof req.body);
    if (req.body && Object.keys(req.body).length > 0) {
      console.log('Body content:', req.body);
    }
  }
  next();
});

// Servir archivos estáticos (para la página de prueba)
app.use(express.static('./'));

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas públicas (SIN AUTENTICACIÓN JWT)
app.use('/health', healthRoutes);           // Health checks
app.use('/api/auth', authRoutes);           // Autenticación

// � JWT ACTIVADO - Middleware de autenticación para rutas protegidas
app.use(verificarToken);

// Rutas protegidas (requieren token JWT válido)
app.use('/api/consulta-clima', consultaClimaRoutes);  
app.use('/api/fuentes', fuenteRoutes);                
app.use('/api/logs', logRoutes);                      

// Middleware global para manejar errores
app.use((error: any, req: any, res: any, next: any) => {
  console.error('Global error handler:', error.message);
  
  // Manejar errores de peticiones abortadas
  if (error.message === 'request aborted' || error.code === 'ECONNABORTED') {
    console.log('Request aborted by client');
    return; // No enviar respuesta si la conexión fue abortada
  }
  
  // Manejar errores de timeout
  if (error.code === 'ECONNRESET' || error.code === 'EPIPE') {
    console.log('Connection reset by client');
    return;
  }
  
  // Manejar otros errores
  if (!res.headersSent) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

// Manejar rutas no encontradas - debe ir al final, después de todas las rutas
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('📡 Data Source initialized');
    
    // Inicializar WebSocket Service
    new WebSocketService(server);
    console.log('🔌 WebSocket Service initialized');
    
    // Configurar manejo de errores del servidor
    server.on('error', (error: any) => {
      console.error('Server error:', error);
    });
    
    server.on('clientError', (error: any, socket: any) => {
      console.error('Client error:', error.message);
      if (!socket.destroyed) {
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
      }
    });
    
    server.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
      console.log(`📚 Documentación Swagger disponible en: http://localhost:${PORT}/api-docs`);
      console.log(`🔌 WebSocket disponible en ws://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error initializing Data Source:', error);
    console.error('🔍 Verificar credenciales de base de datos en el archivo .env:');
    console.error('   - DB_HOST:', process.env.DB_HOST);
    console.error('   - DB_PORT:', process.env.DB_PORT);
    console.error('   - DB_USERNAME:', process.env.DB_USERNAME);
    console.error('   - DB_DATABASE:', process.env.DB_DATABASE);
    console.error('   - DB_PASSWORD:', process.env.DB_PASSWORD ? '[CONFIGURADA]' : '[NO CONFIGURADA]');
  });
