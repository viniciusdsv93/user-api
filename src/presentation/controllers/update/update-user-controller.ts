import { IUpdateUser } from "../../../domain/usecases/update-user";
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
		return ok("");
	}
}
