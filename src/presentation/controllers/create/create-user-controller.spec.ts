import { UserModel } from "../../../domain/models/user";
import { CreateUserModel, ICreateUser } from "../../../domain/usecases/create-user";
import { InvalidParamError } from "../errors/invalid-param-error";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http";
import { HttpRequest } from "../protocols/http";
import { CreateUserController } from "./create-user-controller";

const makeFakeRequest = (): HttpRequest => {
	return {
		body: {
			nome: "nome_valido",
			CPF: "CPF_valido",
			email: "email_valido",
			telefone: "telefone_valido",
			sexo: "Masculino",
			dataNascimento: "15/10/1980",
		},
	};
};

const makeFakeUserModel = (): UserModel => {
	return {
		id: "id_valido",
		nome: "nome_valido",
		CPF: "CPF_valido",
		email: "email_valido",
		telefone: "telefone_valido",
		sexo: "Masculino",
		dataNascimento: "15/10/1980",
	};
};

type SutTypes = {
	sut: CreateUserController;
	createUserStub: ICreateUser;
};

const makeSut = (): SutTypes => {
	class CreateUserStub implements ICreateUser {
		async create(createUserData: CreateUserModel): Promise<UserModel> {
			return new Promise((resolve) => resolve(makeFakeUserModel()));
		}
	}
	const createUserStub = new CreateUserStub();
	const sut = new CreateUserController(createUserStub);
	return {
		sut,
		createUserStub,
	};
};

describe("Create User Controller", () => {
	test("Should return 400 if no name is provided", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle({
			body: {
				CPF: "CPF_valido",
				email: "email_valido",
				telefone: "telefone_valido",
				sexo: "Masculino",
				dataNascimento: "15/10/1980",
			},
		});
		expect(httpResponse).toEqual(badRequest(new MissingParamError("nome")));
	});

	test("Should return 400 if no CPF is provided", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle({
			body: {
				nome: "nome_valido",
				email: "email_valido",
				telefone: "telefone_valido",
				sexo: "Masculino",
				dataNascimento: "15/10/1980",
			},
		});
		expect(httpResponse).toEqual(badRequest(new MissingParamError("CPF")));
	});

	test("Should return 400 if no email is provided", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle({
			body: {
				nome: "nome_valido",
				CPF: "CPF_valido",
				telefone: "telefone_valido",
				sexo: "Masculino",
				dataNascimento: "15/10/1980",
			},
		});
		expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
	});

	test("Should return 400 if no telephone is provided", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle({
			body: {
				nome: "nome_valido",
				CPF: "CPF_valido",
				email: "email_valido",
				sexo: "Masculino",
				dataNascimento: "15/10/1980",
			},
		});
		expect(httpResponse).toEqual(badRequest(new MissingParamError("telefone")));
	});

	test("Should return 400 if no gender is provided", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle({
			body: {
				nome: "nome_valido",
				CPF: "CPF_valido",
				email: "email_valido",
				telefone: "telefone_valido",
				dataNascimento: "15/10/1980",
			},
		});
		expect(httpResponse).toEqual(badRequest(new MissingParamError("sexo")));
	});

	test("Should return 400 if no birthday is provided", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle({
			body: {
				nome: "nome_valido",
				CPF: "CPF_valido",
				email: "email_valido",
				telefone: "telefone_valido",
				sexo: "Masculino",
			},
		});
		expect(httpResponse).toEqual(badRequest(new MissingParamError("dataNascimento")));
	});

	test("Should return 400 if an invalid gender is provided", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle({
			body: {
				nome: "nome_valido",
				CPF: "CPF_valido",
				email: "email_valido",
				telefone: "telefone_valido",
				sexo: "sexo_invalido",
				dataNascimento: "15/10/1980",
			},
		});
		expect(httpResponse).toEqual(
			badRequest(new InvalidParamError("sexo", "O sexo informado é inválido"))
		);
	});

	test("Should call CreateUser usecase with correct values", async () => {
		const { sut, createUserStub } = makeSut();
		const createUserSpy = jest.spyOn(createUserStub, "create");
		await sut.handle(makeFakeRequest());
		expect(createUserSpy).toHaveBeenCalledWith(makeFakeRequest());
	});
});
