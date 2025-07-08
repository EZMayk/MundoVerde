import { Router } from 'express';
import { getAllFuentes } from '../controllers/FuenteClimatica.controller';

const router = Router();

/**
 * @swagger
 * /api/fuentes:
 *   get:
 *     summary: Obtener todas las fuentes climáticas
 *     description: Recupera la lista de todas las fuentes climáticas disponibles
 *     tags: [Fuentes Climáticas]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de fuentes climáticas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FuenteClimaticaDTO'
 *       401:
 *         description: Token no válido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getAllFuentes);

export default router;