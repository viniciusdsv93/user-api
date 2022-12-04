import { UserModel } from "../../../domain/models/user";
import { CreateUserModel } from "../../../domain/usecases/create-user";
import { IUpdateUser } from "../../../domain/usecases/update-user";
import { IFindUserByEmailRepository } from "../../protocols/find-by-email-repository";
import { IUpdateUserRepository } from "../../protocols/update-user-repository";
import { UpdateUser } from "./update-user";

const makeFindUserByEmailRepositoryStub = (): IFindUserByEmailRepository => {
	class FindUserByEmailRepositoryStub implements IFindUserByEmailRepository {
		async findByEmail(email: string): Promise<UserModel | null> {
			return new Promise((resolve) => resolve(makeFakeUserModel()));
		}
	}
	return new FindUserByEmailRepositoryStub();
};

const makeUpdateUserRepositoryStub = (): IUpdateUserRepository => {
	class UpdateUserRepositoryStub implements IUpdateUserRepository {
		async update(email: string, createUserData: CreateUserModel): Promise<UserModel> {
			return new Promise((resolve) => resolve(makeFakeUserModelAfterUpdate()));
		}
	}
	return new UpdateUserRepositoryStub();
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
	updateUserRepositoryStub: IUpdateUserRepository;
};

const makeSut = (): SutTypes => {
	const findUserByEmailRepositoryStub = makeFindUserByEmailRepositoryStub();
	const updateUserRepositoryStub = makeUpdateUserRepositoryStub();
	const sut = new UpdateUser(findUserByEmailRepositoryStub, updateUserRepositoryStub);
	return {
		sut,
		findUserByEmailRepositoryStub,
		updateUserRepositoryStub,
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

	test("Should throw if FindUserByEmail returns null", async () => {
		const { sut, findUserByEmailRepositoryStub } = makeSut();
		jest.spyOn(findUserByEmailRepositoryStub, "findByEmail").mockReturnValueOnce(
			new Promise((resolve) => resolve(null))
		);
		const promise = sut.update("email_valido@mail.com", makeFakeUpdateUserModel());
		await expect(promise).rejects.toThrow();
	});

	test("Should call UpdateUserRepository with correct values", async () => {
		const { sut, updateUserRepositoryStub } = makeSut();
		const updateUserRepositorySpy = jest.spyOn(updateUserRepositoryStub, "update");
		await sut.update("email_valido@mail.com", makeFakeUpdateUserModel());
		expect(updateUserRepositorySpy).toHaveBeenCalledWith(
			"email_valido@mail.com",
			makeFakeUpdateUserModel()
		);
	});

	test("Should throw if UpdateUserRepository throws", async () => {
		const { sut, updateUserRepositoryStub } = makeSut();
		jest.spyOn(updateUserRepositoryStub, "update").mockReturnValueOnce(
			new Promise((resolve, reject) => reject(new Error()))
		);
		const promise = sut.update("email_valido@mail.com", makeFakeUpdateUserModel());
		await expect(promise).rejects.toThrow();
	});
});
