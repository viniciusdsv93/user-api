import { IDeleteUser } from "../../../domain/usecases/delete-user";
import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest, ok } from "../../helpers/http";
import { IController } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class DeleteUserController implements IController {
	private readonly deleteUser: IDeleteUser;

	constructor(deleteUser: IDeleteUser) {
		this.deleteUser = deleteUser;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		if (!httpRequest.params?.email) {
			return badRequest(new MissingParamError("email"));
		}

		return ok("");
	}
}
