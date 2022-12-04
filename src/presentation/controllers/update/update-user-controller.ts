import { IUpdateUser } from "../../../domain/usecases/update-user";
import { InvalidParamError } from "../../errors/invalid-param-error";
import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest, ok } from "../../helpers/http";
import { IController } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class UpdateUserController implements IController {
	private readonly updateUser: IUpdateUser;

	constructor(updateUser: IUpdateUser) {
		this.updateUser = updateUser;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		if (!httpRequest.params?.email) {
			return badRequest(new MissingParamError("email"));
		}

		if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(httpRequest.params.email)) {
			return badRequest(
				new InvalidParamError("email", "O email informado é inválido")
			);
		}

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

		return ok("");
	}
}
