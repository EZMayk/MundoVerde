import { Router } from 'express';
import { ConsultaClimaController } from '../controllers/ConsultaClima.controller';

const router = Router();
const controller = new ConsultaClimaController();

const asyncWrapper = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn.call(controller, req, res, next)).catch(next);

/**
 * @swagger
 * /api/consulta-clima:
 *   get:
 *     summary: Obtener clima por ciudad
 *     description: Consulta el clima actual de una ciudad específica
 *     tags: [Consulta Clima]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: ciudad
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la ciudad
 *         example: "Madrid"
 *     responses:
 *       200:
 *         description: Clima obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConsultaClimaResponseDTO'
 *       400:
 *         description: Parámetro ciudad requerido
 *       401:
 *         description: Token no válido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', asyncWrapper(controller.obtenerClimaPorCiudad));

export default router;
