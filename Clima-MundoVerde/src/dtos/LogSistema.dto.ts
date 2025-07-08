/**
 * @swagger
 * components:
 *   schemas:
 *     LogSistemaDTO:
 *       type: object
 *       properties:
 *         fuenteNombre:
 *           type: string
 *           description: Nombre de la fuente climática utilizada
 *           example: "OpenWeatherMap"
 *         ciudad:
 *           type: string
 *           description: Nombre de la ciudad consultada
 *           example: "Madrid"
 *         resultadoConsulta:
 *           type: string
 *           description: Resultado de la consulta (exitoso, error, etc.)
 *           example: "EXITOSO"
 *         mensaje:
 *           type: string
 *           description: Mensaje descriptivo del log
 *           example: "Consulta realizada correctamente"
 *         fechaHora:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora del log
 *           example: "2025-07-20T10:30:00Z"
 */
export class LogSistemaDTO {
    fuenteNombre!: string;
    ciudad!: string;
    resultadoConsulta!: string;
    mensaje!: string;
    fechaHora!: Date;
}
