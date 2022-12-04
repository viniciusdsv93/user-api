import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest } from "../../helpers/http";
import { GetUserController } from "./get-user-controller";

describe("Get User Controller", () => {
	test("Should return 400 if no email is provided on params", async () => {
		const sut = new GetUserController();
		const httpResponse = await sut.handle({
			params: {},
		});
		expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
	});
});
