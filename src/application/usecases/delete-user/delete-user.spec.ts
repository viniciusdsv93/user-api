import { UserModel } from "../../../domain/models/user";
import { IDeleteUser } from "../../../domain/usecases/delete-user";
import { IDeleteUserRepository } from "../../protocols/delete-user-repository";
import { IFindUserByEmailRepository } from "../../protocols/find-by-email-repository";
import { DeleteUser } from "./delete-user";

const makeDeleteUserRepositoryStub = (): IDeleteUserRepository => {
	class DeleteUserRepositoryStub implements IDeleteUserRepository {
		async delete(email: string): Promise<void> {
			return new Promise((resolve) => resolve());
		}
	}
	return new DeleteUserRepositoryStub();
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
	sut: IDeleteUser;
	deleteUserRepositoryStub: IDeleteUserRepository;
	findUserByEmailRepositoryStub: IFindUserByEmailRepository;
};

const makeSut = (): SutTypes => {
	const deleteUserRepositoryStub = makeDeleteUserRepositoryStub();
	class FindUserByEmailRepositoryStub implements IFindUserByEmailRepository {
		async findByEmail(email: string): Promise<UserModel | null> {
			return new Promise((resolve) => resolve(makeFakeUserModel()));
		}
	}
	const findUserByEmailRepositoryStub = new FindUserByEmailRepositoryStub();
	const sut = new DeleteUser(findUserByEmailRepositoryStub, deleteUserRepositoryStub);
	return {
		sut,
		deleteUserRepositoryStub,
		findUserByEmailRepositoryStub,
	};
};

describe("Delete User Usecase", () => {
	test("Should call FindUserByEmailRepository with correct email", async () => {
		const { sut, findUserByEmailRepositoryStub } = makeSut();
		const findUserByEmailRepositorySpy = jest.spyOn(
			findUserByEmailRepositoryStub,
			"findByEmail"
		);
		await sut.delete("email_valido@mail.com");
		expect(findUserByEmailRepositorySpy).toHaveBeenCalledWith(
			"email_valido@mail.com"
		);
	});

	test("Should throw if FindUserByEmail returns null", async () => {
		const { sut, findUserByEmailRepositoryStub } = makeSut();
		jest.spyOn(findUserByEmailRepositoryStub, "findByEmail").mockReturnValueOnce(
			new Promise((resolve) => resolve(null))
		);
		const promise = sut.delete("email_valido@mail.com");
		await expect(promise).rejects.toThrow();
	});

	test("Should call DeleteUserRepository with correct email", async () => {
		const { sut, deleteUserRepositoryStub } = makeSut();
		const deleteUserRepositorySpy = jest.spyOn(deleteUserRepositoryStub, "delete");
		await sut.delete("email_valido@mail.com");
		expect(deleteUserRepositorySpy).toHaveBeenCalledWith("email_valido@mail.com");
	});

	test("Should throw if DeleteUserRepository throws", async () => {
		const { sut, deleteUserRepositoryStub } = makeSut();
		jest.spyOn(deleteUserRepositoryStub, "delete").mockReturnValueOnce(
			new Promise((resolve, reject) => reject(new Error()))
		);
		const promise = sut.delete("email_valido@mail.com");
		await expect(promise).rejects.toThrow();
	});
});
