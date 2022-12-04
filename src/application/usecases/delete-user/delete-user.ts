import { IDeleteUser } from "../../../domain/usecases/delete-user";
import { IDeleteUserRepository } from "../../protocols/delete-user-repository";

export class DeleteUser implements IDeleteUser {
	private readonly deleteUserRepository: IDeleteUserRepository;

	constructor(deleteUserRepository: IDeleteUserRepository) {
		this.deleteUserRepository = deleteUserRepository;
	}

	async delete(email: string): Promise<void> {
		await this.deleteUserRepository.delete(email);
	}
}
