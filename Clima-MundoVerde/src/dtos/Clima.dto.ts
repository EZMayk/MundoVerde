/**
 * @swagger
 * components:
 *   schemas:
 *     ClimaDTO:
 *       type: object
 *       required:
 *         - temperatura
 *         - humedad
 *         - descripcion
 *         - viento
 *         - presion
 *       properties:
 *         temperatura:
 *           type: number
 *           description: Temperatura en grados Celsius
 *           example: 25.5
 *         humedad:
 *           type: number
 *           description: Porcentaje de humedad
 *           example: 60
 *         descripcion:
 *           type: string
 *           description: Descripción del clima
 *           example: "Soleado"
 *         viento:
 *           type: number
 *           description: Velocidad del viento en km/h
 *           example: 15.2
 *         presion:
 *           type: number
 *           description: Presión atmosférica en hPa
 *           example: 1013.25
 */
export class ClimaDTO {
    temperatura!: number;
    humedad!: number;
    descripcion!: string;
    viento!: number;
    presion!: number;
}
