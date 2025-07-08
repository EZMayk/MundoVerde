/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorConsultaDTO:
 *       type: object
 *       properties:
 *         codigoError:
 *           type: string
 *           description: Código del error ocurrido
 *           example: "CITY_NOT_FOUND"
 *         mensaje:
 *           type: string
 *           description: Mensaje descriptivo del error
 *           example: "Ciudad no encontrada"
 *         fechaError:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora cuando ocurrió el error
 *           example: "2025-07-20T10:30:00Z"
 */
export class ErrorConsultaDTO {
    codigoError!: string;
    mensaje!: string;
    fechaError!: Date;
}
