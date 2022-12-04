import { Request, Response } from "express";
import { IController } from "../../presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "../../presentation/protocols/http";

export const expressAdaptRoute = (controller: IController) => {
	return async (req: Request, res: Response) => {
		const httpRequest: HttpRequest = {
			body: req.body,
		};
		const httpResponse: HttpResponse = await controller.handle(httpRequest);
		if (httpResponse.statusCode === 200 || httpResponse.statusCode === 201) {
			res.status(httpResponse.statusCode).json(httpResponse.body);
		} else {
			res.status(httpResponse.statusCode).json({
				error: httpResponse.body.message,
			});
		}
	};
};
