import { IDeleteUser } from "../../../domain/usecases/delete-user";
import { IDeleteUserRepository } from "../../protocols/delete-user-repository";
import { DeleteUser } from "./delete-user";

type SutTypes = {
	sut: IDeleteUser;
	deleteUserRepositoryStub: IDeleteUserRepository;
};

const makeSut = (): SutTypes => {
	class DeleteUserRepositoryStub implements IDeleteUserRepository {
		async delete(email: string): Promise<void> {
			return new Promise((resolve) => resolve());
		}
	}
	const deleteUserRepositoryStub = new DeleteUserRepositoryStub();
	const sut = new DeleteUser(deleteUserRepositoryStub);
	return {
		sut,
		deleteUserRepositoryStub,
	};
};

describe("Delete User Usecase", () => {
	test("Should call DeleteUserRepository with correct email", async () => {
		const { sut, deleteUserRepositoryStub } = makeSut();
		const deleteUserRepositorySpy = jest.spyOn(deleteUserRepositoryStub, "delete");
		await sut.delete("email_valido@mail.com");
		expect(deleteUserRepositorySpy).toHaveBeenCalledWith("email_valido@mail.com");
	});
});
