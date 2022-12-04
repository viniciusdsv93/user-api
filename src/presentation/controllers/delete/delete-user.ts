import { IDeleteUser } from "../../../domain/usecases/delete-user";
import { InvalidParamError } from "../../errors/invalid-param-error";
import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest, noContent, ok, serverError } from "../../helpers/http";
import { IController } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class DeleteUserController implements IController {
	private readonly deleteUser: IDeleteUser;

	constructor(deleteUser: IDeleteUser) {
		this.deleteUser = deleteUser;
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

			await this.deleteUser.delete(httpRequest.params.email);

			return noContent();
		} catch (error) {
			return serverError(error as Error);
		}
	}
}
