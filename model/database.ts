import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "../config/config";
import { Payment } from "./payment.model"

const env = config.project_env? config.project_env : "development"


const typeorm = new DataSource({
	type: "postgres",
	host: config.db_host,
	port: Number(config.db_port),
	username: config.db_username,
	password: config.db_pass,
	database: config.db_name,
	synchronize: true,
	logging: true,
	entities: [Payment],
	subscribers: [],
	migrations: [],
});

export async function SyncDatabase() {
	try {
		await db.typeorm.initialize();
	} catch (err) {
		console.log(`Unable to connect database with error ${err}`);
	}

	console.log("Successfully connected to the database.");

	try {
		await db.typeorm.synchronize();
	} catch (err) {
		console.log(`Unable to sync the database with error ${err}`);
	}

	console.log("Successfully synced the database.");
console.log(`This server is run on ${env} environment`)

}

interface Db {
	typeorm: DataSource;
}

const db: Db = {
	typeorm: typeorm,
};

export default db;
