import { UserModel } from "../../../domain/models/user";
import { CreateUserModel } from "../../../domain/usecases/create-user";
import { IUpdateUser } from "../../../domain/usecases/update-user";
import { IFindUserByEmailRepository } from "../../protocols/find-by-email-repository";
import { UpdateUser } from "./update-user";

const makeFindUserByEmailRepositoryStub = (): IFindUserByEmailRepository => {
	class FindUserByEmailRepositoryStub implements IFindUserByEmailRepository {
		async findByEmail(email: string): Promise<UserModel | null> {
			return new Promise((resolve) => resolve(makeFakeUserModel()));
		}
	}
	return new FindUserByEmailRepositoryStub();
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

const makeFakeUpdateUserModel = (): CreateUserModel => {
	return {
		nome: "nome_alterado",
		CPF: "CPF_alterado",
		email: "email_alterado@mail.com",
		telefone: "telefone_alterado",
		sexo: "Outro",
		dataNascimento: "15/10/1985",
	};
};

type SutTypes = {
	sut: IUpdateUser;
	findUserByEmailRepositoryStub: IFindUserByEmailRepository;
};

const makeSut = (): SutTypes => {
	const findUserByEmailRepositoryStub = makeFindUserByEmailRepositoryStub();
	const sut = new UpdateUser(findUserByEmailRepositoryStub);
	return {
		sut,
		findUserByEmailRepositoryStub,
	};
};

describe("Update User Usecase", () => {
	test("Should call FindUserByEmailRepository with correct email", async () => {
		const { sut, findUserByEmailRepositoryStub } = makeSut();
		const findUserByEmailRepositorySpy = jest.spyOn(
			findUserByEmailRepositoryStub,
			"findByEmail"
		);
		await sut.update("email_valido@mail.com", makeFakeUpdateUserModel());
		expect(findUserByEmailRepositorySpy).toHaveBeenCalledWith(
			"email_valido@mail.com"
		);
	});

	// test("Should throw if FindUserByEmail returns null", async () => {
	// 	const { sut, findUserByEmailRepositoryStub } = makeSut();
	// 	jest.spyOn(findUserByEmailRepositoryStub, "findByEmail").mockReturnValueOnce(
	// 		new Promise((resolve) => resolve(null))
	// 	);
	// 	const promise = sut.update("email_valido@mail.com", makeFakeUpdateUserModel());
	// 	await expect(promise).rejects.toThrow();
	// });

	// test("Should call DeleteUserRepository with correct email", async () => {
	// 	const { sut, deleteUserRepositoryStub } = makeSut();
	// 	const deleteUserRepositorySpy = jest.spyOn(deleteUserRepositoryStub, "delete");
	// 	await sut.delete("email_valido@mail.com");
	// 	expect(deleteUserRepositorySpy).toHaveBeenCalledWith("email_valido@mail.com");
	// });

	// test("Should throw if DeleteUserRepository throws", async () => {
	// 	const { sut, deleteUserRepositoryStub } = makeSut();
	// 	jest.spyOn(deleteUserRepositoryStub, "delete").mockReturnValueOnce(
	// 		new Promise((resolve, reject) => reject(new Error()))
	// 	);
	// 	const promise = sut.delete("email_valido@mail.com");
	// 	await expect(promise).rejects.toThrow();
	// });
});
