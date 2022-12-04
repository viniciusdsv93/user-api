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

	// test("Should call DeleteUser usecase with correct email", async () => {
	// 	const { sut, deleteUserStub } = makeSut();
	// 	const deleteUserSpy = jest.spyOn(deleteUserStub, "delete");
	// 	await sut.handle(makeFakeEmailRequest());
	// 	expect(deleteUserSpy).toHaveBeenCalledWith("email_valido@mail.com");
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
