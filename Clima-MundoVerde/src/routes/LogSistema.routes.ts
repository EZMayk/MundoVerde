import { Router } from 'express';
import { getLogs } from '../controllers/LogSistema.controller';

const router = Router();

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Obtener logs del sistema
 *     description: Recupera la lista de logs del sistema con paginación opcional
 *     tags: [Logs del Sistema]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número de página (opcional)
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Cantidad de logs por página (opcional)
 *         example: 10
 *     responses:
 *       200:
 *         description: Lista de logs obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LogSistemaDTO'
 *       401:
 *         description: Token no válido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getLogs); 

export default router;
