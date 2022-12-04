import { UserModel } from "../../domain/models/user";
import { CreateUserModel } from "../../domain/usecases/create-user";
import { IAddUserRepository } from "../protocols/add-user-respository";
import { IFindUserByEmailRepository } from "../protocols/find-by-email-repository";
import { CreateUser } from "./create-user";

const makeFakeCreateUserModel = (): CreateUserModel => {
	return {
		nome: "nome_valido",
		CPF: "CPF_valido",
		email: "email_valido@mail.com",
		telefone: "telefone_valido",
		sexo: "Masculino",
		dataNascimento: "15/10/1980",
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

const makeAddUserRepositoryStub = (): IAddUserRepository => {
	class AddUserRepositoryStub implements IAddUserRepository {
		async add(createUserData: CreateUserModel): Promise<UserModel> {
			return new Promise((resolve) => resolve(makeFakeUserModel()));
		}
	}
	return new AddUserRepositoryStub();
};

const makeFindUserByEmailRepositoryStub = (): IFindUserByEmailRepository => {
	class FindUserByEmailRepositoryStub implements IFindUserByEmailRepository {
		async findByEmail(email: string): Promise<UserModel | null> {
			return new Promise((resolve) => resolve(makeFakeUserModel()));
		}
	}
	return new FindUserByEmailRepositoryStub();
};

type SutTypes = {
	sut: CreateUser;
	addUserRepositoryStub: IAddUserRepository;
	findUserByEmailRepositoryStub: IFindUserByEmailRepository;
};

const makeSut = (): SutTypes => {
	const addUserRepositoryStub = makeAddUserRepositoryStub();
	const findUserByEmailRepositoryStub = makeFindUserByEmailRepositoryStub();
	const sut = new CreateUser(addUserRepositoryStub, findUserByEmailRepositoryStub);
	return {
		sut,
		addUserRepositoryStub,
		findUserByEmailRepositoryStub,
	};
};

describe("Create User Usecase", () => {
	test("Should call FindUserByEmail with the correct email", async () => {
		const { sut, findUserByEmailRepositoryStub } = makeSut();
		const findUserByEmailRepositorySpy = jest.spyOn(
			findUserByEmailRepositoryStub,
			"findByEmail"
		);
		await sut.create(makeFakeCreateUserModel());
		expect(findUserByEmailRepositorySpy).toHaveBeenCalledWith(
			"email_valido@mail.com"
		);
	});

	test("Should call AddUserRepository with the correct values", async () => {
		const { sut, addUserRepositoryStub } = makeSut();
		const addUserRepositorySpy = jest.spyOn(addUserRepositoryStub, "add");
		await sut.create(makeFakeCreateUserModel());
		expect(addUserRepositorySpy).toHaveBeenCalledWith(makeFakeCreateUserModel());
	});

	test("Should throw if AddUserRepository throws", async () => {
		const { sut, addUserRepositoryStub } = makeSut();
		jest.spyOn(addUserRepositoryStub, "add").mockReturnValueOnce(
			new Promise((resolve, reject) => reject(new Error()))
		);
		const promise = sut.create(makeFakeCreateUserModel());
		await expect(promise).rejects.toThrow();
	});

	test("Should return an UserModel on AddUserRepository success", async () => {
		const { sut } = makeSut();
		const result = await sut.create(makeFakeCreateUserModel());
		expect(result).toBeTruthy();
		expect(result).toHaveProperty("id", "id_valido");
		expect(result).toHaveProperty("nome", "nome_valido");
		expect(result).toHaveProperty("CPF", "CPF_valido");
		expect(result).toHaveProperty("email", "email_valido@mail.com");
		expect(result).toHaveProperty("telefone", "telefone_valido");
		expect(result).toHaveProperty("sexo", "Masculino");
		expect(result).toHaveProperty("dataNascimento");
	});
});
