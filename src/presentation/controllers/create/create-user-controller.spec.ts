import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http";
import { CreateUserController } from "./create-user-controller";

describe("Create User Controller", () => {
	test("Should return 400 if no name is provided", async () => {
		const sut = new CreateUserController();
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
		const sut = new CreateUserController();
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
		const sut = new CreateUserController();
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
		const sut = new CreateUserController();
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
		const sut = new CreateUserController();
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
});
