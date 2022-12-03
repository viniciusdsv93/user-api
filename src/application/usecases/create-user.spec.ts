import { UserModel } from "../../domain/models/user";
import { CreateUserModel } from "../../domain/usecases/create-user";
import { IAddUserRepository } from "../protocols/add-user-respository";
import { CreateUser } from "./create-user";

describe("Create User Usecase", () => {
	test("Should call AddUserRepository with the correct values", () => {
		class AddUserRepositoryStub implements IAddUserRepository {
			async add(createUserData: CreateUserModel): Promise<UserModel> {
				return new Promise((resolve) =>
					resolve({
						id: "id_valido",
						nome: "nome_valido",
						CPF: "CPF_valido",
						email: "email_valido",
						telefone: "telefone_valido",
						sexo: "Masculino",
						dataNascimento: "15/10/1980",
					})
				);
			}
		}
		const addUserRepositoryStub = new AddUserRepositoryStub();
		const sut = new CreateUser(addUserRepositoryStub);
		const addUserRepositorySpy = jest.spyOn(addUserRepositoryStub, "add");
		sut.create({
			nome: "nome_valido",
			CPF: "CPF_valido",
			email: "email_valido",
			telefone: "telefone_valido",
			sexo: "Masculino",
			dataNascimento: "15/10/1980",
		});
		expect(addUserRepositorySpy).toHaveBeenCalledWith({
			nome: "nome_valido",
			CPF: "CPF_valido",
			email: "email_valido",
			telefone: "telefone_valido",
			sexo: "Masculino",
			dataNascimento: "15/10/1980",
		});
	});
});
