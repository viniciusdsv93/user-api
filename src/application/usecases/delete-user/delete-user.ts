import { IDeleteUser } from "../../../domain/usecases/delete-user";
import { IDeleteUserRepository } from "../../protocols/delete-user-repository";
import { IFindUserByEmailRepository } from "../../protocols/find-by-email-repository";

export class DeleteUser implements IDeleteUser {
	private readonly findUserByEmailRepository: IFindUserByEmailRepository;
	private readonly deleteUserRepository: IDeleteUserRepository;

	constructor(
		findUserByEmailRepository: IFindUserByEmailRepository,
		deleteUserRepository: IDeleteUserRepository
	) {
		this.findUserByEmailRepository = findUserByEmailRepository;
		this.deleteUserRepository = deleteUserRepository;
	}

	async delete(email: string): Promise<void> {
		const foundUser = await this.findUserByEmailRepository.findByEmail(email);

		if (!foundUser) {
			throw new Error("Não foi encontrado nenhum usuário com o email informado");
		}

		await this.deleteUserRepository.delete(email);
	}
}
