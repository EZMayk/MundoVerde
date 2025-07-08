/**
 * @swagger
 * components:
 *   schemas:
 *     FuenteClimaticaDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID único de la fuente climática
 *           example: 1
 *         nombre:
 *           type: string
 *           description: Nombre de la fuente climática
 *           example: "OpenWeatherMap"
 *         urlBase:
 *           type: string
 *           description: URL base de la API de la fuente climática
 *           example: "https://api.openweathermap.org/data/2.5"
 */
export class FuenteClimaticaDTO {
    id?: number; // Puede ser opcional si solo lo usamos en respuestas
    nombre!: string;
    urlBase!: string;
}
