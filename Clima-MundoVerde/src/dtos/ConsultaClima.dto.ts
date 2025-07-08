import { ClimaDTO } from "./Clima.dto";
import { ErrorConsultaDTO } from "./ErrorConsulta.dto";

/**
 * @swagger
 * components:
 *   schemas:
 *     ConsultaClimaRequestDTO:
 *       type: object
 *       required:
 *         - ciudad
 *       properties:
 *         ciudad:
 *           type: string
 *           description: Nombre de la ciudad para consultar el clima
 *           example: "Madrid"
 */
export class ConsultaClimaRequestDTO {
    ciudad!: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ConsultaClimaResponseDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID único de la consulta
 *           example: 1
 *         ciudad:
 *           type: string
 *           description: Nombre de la ciudad consultada
 *           example: "Madrid"
 *         latitud:
 *           type: number
 *           description: Latitud de la ciudad
 *           example: 40.4168
 *         longitud:
 *           type: number
 *           description: Longitud de la ciudad
 *           example: -3.7038
 *         fechaConsulta:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la consulta
 *           example: "2025-07-20T10:30:00Z"
 *         exito:
 *           type: boolean
 *           description: Indica si la consulta fue exitosa
 *           example: true
 *         fuenteNombre:
 *           type: string
 *           description: Nombre de la fuente climática utilizada
 *           example: "OpenWeatherMap"
 *         clima:
 *           $ref: '#/components/schemas/ClimaDTO'
 *         error:
 *           $ref: '#/components/schemas/ErrorConsultaDTO'
 */
export class ConsultaClimaResponseDTO {
    id!: number;
    ciudad!: string;
    latitud!: number;
    longitud!: number;
    fechaConsulta!: Date;
    exito!: boolean;
    fuenteNombre!: string;
    clima?: ClimaDTO;
    error?: ErrorConsultaDTO;
}
