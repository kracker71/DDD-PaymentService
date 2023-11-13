import app from "./app"
import config from "./config/config"
import {SyncDatabase} from "./model/database"

main()

async function main() {
    await SyncDatabase()

    app.listen(Number(config.port || 3000), config.backend_url || "localhost",()=>
        console.log(`🚀 Payment Service has listening on ${config.backend_url || "localhost"}:${config.port || 3000}`)
    )
}