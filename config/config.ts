import {config} from "dotenv"

config()

const env_config = {
    project_env: process.env.PROJECT_ENV,
    db_name: process.env.DB_NAME,
    db_username: process.env.DB_USERNAME,
    db_pass: process.env.DB_PASS,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    port: process.env.PORT,
    backend_url: process.env.BACKEND_URL,
    database_type: process.env.DB_TYPE
}

export default env_config