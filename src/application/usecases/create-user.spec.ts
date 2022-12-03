import { UserModel } from "../../domain/models/user";
import { CreateUserModel } from "../../domain/usecases/create-user";
import { IAddUserRepository } from "../protocols/add-user-respository";
import { CreateUser } from "./create-user";

const makeFakeCreateUserModel = (): CreateUserModel => {
	return {
		nome: "nome_valido",
		CPF: "CPF_valido",
		email: "email_valido",
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
		email: "email_valido",
		telefone: "telefone_valido",
		sexo: "Masculino",
		dataNascimento: "15/10/1980",
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

type SutTypes = {
	sut: CreateUser;
	addUserRepositoryStub: IAddUserRepository;
};

const makeSut = (): SutTypes => {
	const addUserRepositoryStub = makeAddUserRepositoryStub();
	const sut = new CreateUser(addUserRepositoryStub);
	return {
		sut,
		addUserRepositoryStub,
	};
};

describe("Create User Usecase", () => {
	test("Should call AddUserRepository with the correct values", () => {
		const { sut, addUserRepositoryStub } = makeSut();
		const addUserRepositorySpy = jest.spyOn(addUserRepositoryStub, "add");
		sut.create(makeFakeCreateUserModel());
		expect(addUserRepositorySpy).toHaveBeenCalledWith(makeFakeCreateUserModel());
	});
});
