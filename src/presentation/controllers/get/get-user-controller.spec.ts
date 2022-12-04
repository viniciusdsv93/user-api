import { UserModel } from "../../../domain/models/user";
import { IGetUser } from "../../../domain/usecases/get-user";
import { InvalidParamError } from "../../errors/invalid-param-error";
import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest } from "../../helpers/http";
import { GetUserController } from "./get-user-controller";

const makeGetUserStub = (): IGetUser => {
	class GetUserStub implements IGetUser {
		async get(email: string): Promise<UserModel | null> {
			return new Promise((resolve) => resolve(makeFakeUserModel()));
		}
	}
	return new GetUserStub();
};

const makeFakeEmailRequest = () => {
	return {
		params: {
			email: "email_valido@mail.com",
		},
	};
};

const makeFakeUserModel = (): UserModel => {
	return {
		id: "id_valido",
		nome: "nome_valido",
		CPF: "CPF_valido",
		email: "email_valido@mail.com",
		telefone: "telefone_valido",
		sexo: "Masculino",
		dataNascimento: new Date(1980, 10 - 1, 15),
	};
};

type SutTypes = {
	sut: GetUserController;
	getUserStub: IGetUser;
};

const makeSut = (): SutTypes => {
	const getUserStub = makeGetUserStub();
	const sut = new GetUserController(getUserStub);
	return {
		sut,
		getUserStub,
	};
};

describe("Get User Controller", () => {
	test("Should return 400 if no email is provided on params", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle({
			params: {},
		});
		expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
	});

	test("Should return 400 if an invalid email is provided", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle({
			params: {
				email: "email_invalido",
			},
		});
		expect(httpResponse).toEqual(
			badRequest(new InvalidParamError("email", "O email informado é inválido"))
		);
	});

	test("Should call GetUser usecase with correct email", async () => {
		const { sut, getUserStub } = makeSut();
		const getUserSpy = jest.spyOn(getUserStub, "get");
		await sut.handle(makeFakeEmailRequest());
		expect(getUserSpy).toHaveBeenCalledWith("email_valido@mail.com");
	});
});
