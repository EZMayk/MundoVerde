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
import { verificarToken } from './middlewares/auth.middleware';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { WebSocketService } from './websocket/websocket.service';

const app = express();
const server = createServer(app);

// Configurar CORS
app.use(cors({
    origin: ['http://localhost:3001', 'http://127.0.0.1:3001', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (para la página de prueba)
app.use(express.static('./'));

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta pública (NO protegida con token)
app.use('/api/auth', authRoutes);

// Middleware que protege TODO lo que sigue
app.use(verificarToken);

// Rutas protegidas
app.use('/api/consulta-clima', consultaClimaRoutes);  
app.use('/api/fuentes', fuenteRoutes);                
app.use('/api/logs', logRoutes);                      

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('📡 Data Source initialized');
    
    // Inicializar WebSocket Service
    new WebSocketService(server);
    console.log('🔌 WebSocket Service initialized');
    
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
