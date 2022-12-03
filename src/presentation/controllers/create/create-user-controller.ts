import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http";
import { IController } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class CreateUserController implements IController {
	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const requiredFields = [
			"nome",
			"CPF",
			"email",
			"telefone",
			"sexo",
			"dataNascimento",
		];
		for (const field of requiredFields) {
			if (!httpRequest.body[field]) {
				return badRequest(new MissingParamError(field));
			}
		}

		throw new Error("Method not implemented.");
	}
}
