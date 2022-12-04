import { UserModel } from "../../../domain/models/user";
import { IGetUser } from "../../../domain/usecases/get-user";
import { IFindUserByEmailRepository } from "../../protocols/find-by-email-repository";
import { GetUser } from "./get-user";

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

type SutTypes = {
	sut: IGetUser;
	findUserByEmailRepositoryStub: IFindUserByEmailRepository;
};

const makeSut = (): SutTypes => {
	const findUserByEmailRepositoryStub = makeFindUserByEmailRepositoryStub();
	const sut = new GetUser(findUserByEmailRepositoryStub);
	return {
		sut,
		findUserByEmailRepositoryStub,
	};
};

describe("Get User Usecase", () => {
	test("Should call FindUserByEmailRepository with correct email", async () => {
		const { sut, findUserByEmailRepositoryStub } = makeSut();
		const findUserByEmailRepositorySpy = jest.spyOn(
			findUserByEmailRepositoryStub,
			"findByEmail"
		);
		await sut.get("email_valido@mail.com");
		expect(findUserByEmailRepositorySpy).toHaveBeenCalledWith(
			"email_valido@mail.com"
		);
	});
});
