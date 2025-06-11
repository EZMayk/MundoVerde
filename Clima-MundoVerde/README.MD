🌱 Clima-MundoVerde
API REST desarrollada en TypeScript y Express que permite consultar datos climáticos en tiempo real desde OpenWeather y almacenarlos en una base de datos Supabase para auditoría y análisis posteriores.

📦 Tecnologías utilizadas
Node.js + Express

* TypeScript

* TypeORM

* Supabase (PostgreSQL gestionado)

* OpenWeather API

* Axios

* Dotenv

* CORS


🔧 Requisitos Previos

Node.js ≥ 18.x

Docker Compose

Cuenta gratuita en OpenWeatherMap para obtener una API key

📦 Instalación y Ejecución

Clona el repositorio:

git clone https://github.com/EZMayk/MundoVerde.git

⚙️ Configuración del entorno
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

DB_HOST=aws-0-us-east-2.pooler.supabase.com
DB_PORT=6543
DB_USERNAME=postgres.xsdzrbphlibhwmegavsc
DB_PASSWORD=Menendez2025*_*
DB_DATABASE=postgres
PORT=3000
OPENWEATHER_API_KEY=fbf0bedef7d799633876a3253f1e575a
OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5/weather

 Pruebas con Thunder Client
1️⃣ GET /consulta-clima
Consulta el clima actual de una ciudad utilizando la API de OpenWeather.

Método: GET

URL: http://localhost:3000/api/consulta-clima?ciudad=Guayaquil

Parámetros de consulta:

ciudad (string): nombre de la ciudad

📌 Este endpoint realiza:

La consulta en OpenWeather.

Guarda el clima en la base de datos Supabase.

Registra la consulta en la tabla consulta.

Guarda el log del resultado.


🔍 Obtener fuentes climáticas
Obtiene todas las fuentes climáticas disponibles en la base de datos
Método: GET

URL: http://localhost:3000/api/fuentes



* Obtener logs de consultas
Obtiene todos los registros de logs del sistema, con filtros opcionales.

Método: GET

URL: http://localhost:3000/api/logs

Parámetros de consulta opcionales:

ciudad (string)

resultado (string, ejemplo: "éxito" o "error")

fuente (string)

✅ Ejemplo sin filtros:
GET http://localhost:3000/api/logs


✅ Ejemplo con filtros:
GET http://localhost:3000/api/logs?ciudad=Quito&resultado=éxito