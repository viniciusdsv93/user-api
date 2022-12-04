import { ICreateUser } from "../../../domain/usecases/create-user";
import { InvalidParamError } from "../../errors/invalid-param-error";
import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest, created, ok, serverError } from "../../helpers/http";
import { IController } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class CreateUserController implements IController {
	private readonly createUser: ICreateUser;

	constructor(createUser: ICreateUser) {
		this.createUser = createUser;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
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

			if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(httpRequest.body["email"])) {
				return badRequest(
					new InvalidParamError("email", "O email informado é inválido")
				);
			}

			const createdUserData = await this.createUser.create(httpRequest.body);

			return created(createdUserData);
		} catch (error) {
			return serverError(error as Error);
		}
	}
}
