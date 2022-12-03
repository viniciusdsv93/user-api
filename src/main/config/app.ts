import express from "express";
import * as dotenv from "dotenv";
import { router } from "../routes/routes";
dotenv.config();

export class App {
	private readonly express: express.Application;
	private readonly port = process.env.PORT || 3334;

	constructor() {
		this.express = express();
		this.routes();
		this.listen();
	}

	private routes() {
		this.express.use(router);
	}

	private listen() {
		this.express.listen(this.port, () => {
			console.log(`Server running on http://localhost:${this.port}/api-docs`);
		});
	}
}
