import express from "express";
import * as dotenv from "dotenv";
import { router } from "../routes/routes";
import { cors } from "../middlewares/cors";
import { bodyParser } from "../middlewares/body-parser";
import { contentType } from "../middlewares/content-type";
dotenv.config();
import { serve, setup } from "swagger-ui-express";
import swaggerDocument from "../../../swagger.json";

export class App {
	private readonly express: express.Application;
	private readonly port = process.env.PORT || 3334;

	constructor() {
		this.express = express();
		this.documentation();
		this.middlewares();
		this.routes();
		this.listen();
	}

	private documentation() {
		this.express.use("/api-docs", serve, setup(swaggerDocument));
	}

	private routes() {
		this.express.use(router);
	}

	private middlewares() {
		this.express.use(cors);
		this.express.use(bodyParser);
		this.express.use(contentType);
	}

	private listen() {
		this.express.listen(this.port, () => {
			console.log(`Server running on http://localhost:${this.port}/api-docs`);
		});
	}
}
