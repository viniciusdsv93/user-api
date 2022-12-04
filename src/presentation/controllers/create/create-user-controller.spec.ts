import { UserModel } from "../../../domain/models/user";
import { CreateUserModel, ICreateUser } from "../../../domain/usecases/create-user";
import { InvalidParamError } from "../../errors/invalid-param-error";
import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest, created, serverError } from "../../helpers/http";
import { HttpRequest } from "../../protocols/http";
import { CreateUserController } from "./create-user-controller";

const makeFakeRequest = (): HttpRequest => {
	return {
		body: {
			nome: "nome_valido",
			CPF: "CPF_valido",
			email: "email_valido@mail.com",
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
		email: "email_valido@mail.com",
		telefone: "telefone_valido",
		sexo: "Masculino",
		dataNascimento: new Date(1980, 10 - 1, 15),
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
				email: "email_valido@mail.com",
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
				email: "email_valido@mail.com",
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
				email: "email_valido@mail.com",
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
				email: "email_valido@mail.com",
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
				email: "email_valido@mail.com",
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
				email: "email_valido@mail.com",
				telefone: "telefone_valido",
				sexo: "sexo_invalido",
				dataNascimento: "15/10/1980",
			},
		});
		expect(httpResponse).toEqual(
			badRequest(
				new InvalidParamError(
					"sexo",
					"O sexo informado é inválido. As opções são: Masculino, Feminino ou Outro"
				)
			)
		);
	});

	test("Should return 400 if an invalid email is provided", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle({
			body: {
				nome: "nome_valido",
				CPF: "CPF_valido",
				email: "email_invalido",
				telefone: "telefone_valido",
				sexo: "Masculino",
				dataNascimento: "15/10/1980",
			},
		});
		expect(httpResponse).toEqual(
			badRequest(new InvalidParamError("email", "O email informado é inválido"))
		);
	});

	test("Should return 500 if CreateUser usecase throws", async () => {
		const { sut, createUserStub } = makeSut();
		jest.spyOn(createUserStub, "create").mockReturnValueOnce(
			new Promise((resolve, reject) => reject(new Error()))
		);
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(serverError(new Error()));
	});

	test("Should call CreateUser usecase with the correct values", async () => {
		const { sut, createUserStub } = makeSut();
		const createUserSpy = jest.spyOn(createUserStub, "create");
		await sut.handle(makeFakeRequest());
		expect(createUserSpy).toHaveBeenCalledWith(makeFakeRequest().body);
	});

	test("Should return an user model on success", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(created(makeFakeUserModel()));
	});
});
