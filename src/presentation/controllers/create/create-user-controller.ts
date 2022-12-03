import { InvalidParamError } from "../errors/invalid-param-error";
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

		if (
			httpRequest.body["sexo"] !== "Masculino" ||
			httpRequest.body["sexo"] !== "Feminino" ||
			httpRequest.body["sexo"] !== "Outro"
		) {
			return badRequest(
				new InvalidParamError("sexo", "O sexo informado é inválido")
			);
		}

		throw new Error("Method not implemented.");
	}
}
