import { UserModel } from "../../../domain/models/user";
import { IDeleteUser } from "../../../domain/usecases/delete-user";
import { IGetUser } from "../../../domain/usecases/get-user";
import { InvalidParamError } from "../../errors/invalid-param-error";
import { MissingParamError } from "../../errors/missing-param-error";
import { NotFoundError } from "../../errors/not-found-error";
import { badRequest, notFound, ok, serverError } from "../../helpers/http";
import { DeleteUserController } from "./delete-user";

const makeDeleteUserStub = (): IDeleteUser => {
	class DeleteUserStub implements IDeleteUser {
		async delete(email: string): Promise<void> {
			return new Promise((resolve) => resolve());
		}
	}
	return new DeleteUserStub();
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
	sut: DeleteUserController;
	deleteUserStub: IDeleteUser;
};

const makeSut = (): SutTypes => {
	const deleteUserStub = makeDeleteUserStub();
	const sut = new DeleteUserController(deleteUserStub);
	return {
		sut,
		deleteUserStub,
	};
};

describe("Delete User Controller", () => {
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
});
