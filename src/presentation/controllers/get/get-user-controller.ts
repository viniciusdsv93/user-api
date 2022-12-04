import { InvalidParamError } from "../../errors/invalid-param-error";
import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest, ok } from "../../helpers/http";
import { IController } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class GetUserController implements IController {
	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		if (!httpRequest.params?.email) {
			return badRequest(new MissingParamError("email"));
		}

		if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(httpRequest.params.email)) {
			return badRequest(
				new InvalidParamError("email", "O email informado é inválido")
			);
		}

		return ok("");
	}
}
