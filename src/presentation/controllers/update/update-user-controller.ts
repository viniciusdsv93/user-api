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

		if (
			httpRequest.body["sexo"] !== "Masculino" &&
			httpRequest.body["sexo"] !== "Feminino" &&
			httpRequest.body["sexo"] !== "Outro"
		) {
			return badRequest(
				new InvalidParamError(
					"sexo",
					"O sexo informado é inválido. As opções são: Masculino, Feminino ou Outro"
				)
			);
		}

		if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(httpRequest.body.email)) {
			return badRequest(
				new InvalidParamError("email", "O email informado é inválido")
			);
		}

		const { nome, CPF, email, telefone, sexo, dataNascimento } = httpRequest.body;

		await this.updateUser.update(httpRequest.params.email, {
			nome,
			CPF,
			email,
			telefone,
			sexo,
			dataNascimento,
		});

		return ok("");
	}
}
