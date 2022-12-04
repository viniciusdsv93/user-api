import { UserModel } from "../../../domain/models/user";
import { CreateUserModel } from "../../../domain/usecases/create-user";
import { IDeleteUser } from "../../../domain/usecases/delete-user";
import { IGetUser } from "../../../domain/usecases/get-user";
import { IUpdateUser } from "../../../domain/usecases/update-user";
import { InvalidParamError } from "../../errors/invalid-param-error";
import { MissingParamError } from "../../errors/missing-param-error";
import { NotFoundError } from "../../errors/not-found-error";
import { badRequest, noContent, notFound, ok, serverError } from "../../helpers/http";
import { UpdateUserController } from "./update-user-controller";

const makeUpdateUserStub = (): IUpdateUser => {
	class UpdateUserStub implements IUpdateUser {
		async update(email: string, createUserData: CreateUserModel): Promise<UserModel> {
			return new Promise((resolve) => resolve(makeFakeUserModelAfterUpdate()));
		}
	}
	return new UpdateUserStub();
};

const makeFakeUserModelAfterUpdate = (): UserModel => {
	return {
		id: "id_valido",
		nome: "nome_alterado",
		CPF: "CPF_alterado",
		email: "email_alterado@mail.com",
		telefone: "telefone_alterado",
		sexo: "Outro",
		dataNascimento: new Date(1985, 10 - 1, 15),
	};
};

const makeFakeUpdateRequest = () => {
	return {
		params: {
			email: "email_valido@mail.com",
		},
		body: {
			nome: "nome_alterado",
			CPF: "CPF_alterado",
			email: "email_alterado@mail.com",
			telefone: "telefone_alterado",
			sexo: "Outro",
			dataNascimento: "15/10/1985",
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
	sut: UpdateUserController;
	updateUserStub: IUpdateUser;
};

const makeSut = (): SutTypes => {
	const updateUserStub = makeUpdateUserStub();
	const sut = new UpdateUserController(updateUserStub);
	return {
		sut,
		updateUserStub,
	};
};

describe("Update User Controller", () => {
	test("Should return 400 if no email is provided on params", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle({
			params: {},
		});
		expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
	});

	test("Should return 400 if an invalid email is provided on params", async () => {
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

	test("Should return 400 if no name is provided", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle({
			params: {
				email: "email_valido@mail.com",
			},
			body: {
				CPF: "CPF_alterado",
				email: "email_alterado@mail.com",
				telefone: "telefone_alterado",
				sexo: "Outro",
				dataNascimento: "15/10/1985",
			},
		});
		expect(httpResponse).toEqual(badRequest(new MissingParamError("nome")));
	});

	// test("Should return 400 if no CPF is provided", async () => {
	// 	const { sut } = makeSut();
	// 	const httpResponse = await sut.handle({
	// 		body: {
	// 			nome: "nome_valido",
	// 			email: "email_valido@mail.com",
	// 			telefone: "telefone_valido",
	// 			sexo: "Masculino",
	// 			dataNascimento: "15/10/1980",
	// 		},
	// 	});
	// 	expect(httpResponse).toEqual(badRequest(new MissingParamError("CPF")));
	// });

	// test("Should return 400 if no email is provided", async () => {
	// 	const { sut } = makeSut();
	// 	const httpResponse = await sut.handle({
	// 		body: {
	// 			nome: "nome_valido",
	// 			CPF: "CPF_valido",
	// 			telefone: "telefone_valido",
	// 			sexo: "Masculino",
	// 			dataNascimento: "15/10/1980",
	// 		},
	// 	});
	// 	expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
	// });

	// test("Should return 400 if no telephone is provided", async () => {
	// 	const { sut } = makeSut();
	// 	const httpResponse = await sut.handle({
	// 		body: {
	// 			nome: "nome_valido",
	// 			CPF: "CPF_valido",
	// 			email: "email_valido@mail.com",
	// 			sexo: "Masculino",
	// 			dataNascimento: "15/10/1980",
	// 		},
	// 	});
	// 	expect(httpResponse).toEqual(badRequest(new MissingParamError("telefone")));
	// });

	// test("Should return 400 if no gender is provided", async () => {
	// 	const { sut } = makeSut();
	// 	const httpResponse = await sut.handle({
	// 		body: {
	// 			nome: "nome_valido",
	// 			CPF: "CPF_valido",
	// 			email: "email_valido@mail.com",
	// 			telefone: "telefone_valido",
	// 			dataNascimento: "15/10/1980",
	// 		},
	// 	});
	// 	expect(httpResponse).toEqual(badRequest(new MissingParamError("sexo")));
	// });

	// test("Should return 400 if no birthday is provided", async () => {
	// 	const { sut } = makeSut();
	// 	const httpResponse = await sut.handle({
	// 		body: {
	// 			nome: "nome_valido",
	// 			CPF: "CPF_valido",
	// 			email: "email_valido@mail.com",
	// 			telefone: "telefone_valido",
	// 			sexo: "Masculino",
	// 		},
	// 	});
	// 	expect(httpResponse).toEqual(badRequest(new MissingParamError("dataNascimento")));
	// });

	// test("Should return 400 if an invalid gender is provided", async () => {
	// 	const { sut } = makeSut();
	// 	const httpResponse = await sut.handle({
	// 		body: {
	// 			nome: "nome_valido",
	// 			CPF: "CPF_valido",
	// 			email: "email_valido@mail.com",
	// 			telefone: "telefone_valido",
	// 			sexo: "sexo_invalido",
	// 			dataNascimento: "15/10/1980",
	// 		},
	// 	});
	// 	expect(httpResponse).toEqual(
	// 		badRequest(
	// 			new InvalidParamError(
	// 				"sexo",
	// 				"O sexo informado é inválido. As opções são: Masculino, Feminino ou Outro"
	// 			)
	// 		)
	// 	);
	// });

	// test("Should return 400 if an invalid email is provided", async () => {
	// 	const { sut } = makeSut();
	// 	const httpResponse = await sut.handle({
	// 		body: {
	// 			nome: "nome_valido",
	// 			CPF: "CPF_valido",
	// 			email: "email_invalido",
	// 			telefone: "telefone_valido",
	// 			sexo: "Masculino",
	// 			dataNascimento: "15/10/1980",
	// 		},
	// 	});
	// 	expect(httpResponse).toEqual(
	// 		badRequest(new InvalidParamError("email", "O email informado é inválido"))
	// 	);
	// });

	// test("Should call UpdateUser usecase with correct values", async () => {
	// 	const { sut, updateUserStub } = makeSut();
	// 	const updateUserSpy = jest.spyOn(updateUserStub, "update");
	// 	await sut.handle(makeFakeUpdateRequest());
	// 	expect(updateUserSpy).toHaveBeenCalledWith("email_valido@mail.com", {
	// 		nome: "nome_alterado",
	// 		CPF: "CPF_alterado",
	// 		email: "email_alterado@mail.com",
	// 		telefone: "telefone_alterado",
	// 		sexo: "Outro",
	// 		dataNascimento: "15/10/1985",
	// 	});
	// });

	// test("Should return 500 if DeleteUser usecase throws", async () => {
	// 	const { sut, deleteUserStub } = makeSut();
	// 	jest.spyOn(deleteUserStub, "delete").mockReturnValueOnce(
	// 		new Promise((resolve, reject) => reject(new Error()))
	// 	);
	// 	const httpResponse = await sut.handle(makeFakeEmailRequest());
	// 	expect(httpResponse).toEqual(serverError(new Error()));
	// });

	// test("Should return 204 if DeleteUser usecase succeeds", async () => {
	// 	const { sut } = makeSut();
	// 	const httpResponse = await sut.handle(makeFakeEmailRequest());
	// 	expect(httpResponse).toEqual(noContent());
	// });
});
