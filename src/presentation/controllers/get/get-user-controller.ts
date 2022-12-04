import { IGetUser } from "../../../domain/usecases/get-user";
import { InvalidParamError } from "../../errors/invalid-param-error";
import { MissingParamError } from "../../errors/missing-param-error";
import { NotFoundError } from "../../errors/not-found-error";
import { badRequest, notFound, ok, serverError } from "../../helpers/http";
import { IController } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class GetUserController implements IController {
	private readonly getUser: IGetUser;

	constructor(getUser: IGetUser) {
		this.getUser = getUser;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			if (!httpRequest.params?.email) {
				return badRequest(new MissingParamError("email"));
			}

			if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(httpRequest.params.email)) {
				return badRequest(
					new InvalidParamError("email", "O email informado é inválido")
				);
			}

			const foundUser = await this.getUser.get(httpRequest.params.email);

			if (foundUser) {
				return ok(foundUser);
			}

			return notFound(
				new NotFoundError(
					"email",
					"Não foi encontrado nenhum usuário com o email informado"
				)
			);
		} catch (error) {
			return serverError(error as Error);
		}
	}
}
