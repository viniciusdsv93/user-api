import { UserModel } from "../../../domain/models/user";
import { CreateUserModel } from "../../../domain/usecases/create-user";
import { IUpdateUser } from "../../../domain/usecases/update-user";
import { IFindUserByEmailRepository } from "../../protocols/find-by-email-repository";
import { IUpdateUserRepository } from "../../protocols/update-user-repository";

export class UpdateUser implements IUpdateUser {
	private readonly findUserByEmailRepository: IFindUserByEmailRepository;
	private readonly updateUserRepository: IUpdateUserRepository;

	constructor(
		findUserByEmailRepository: IFindUserByEmailRepository,
		updateUserRepository: IUpdateUserRepository
	) {
		this.findUserByEmailRepository = findUserByEmailRepository;
		this.updateUserRepository = updateUserRepository;
	}

	async update(email: string, createUserData: CreateUserModel): Promise<UserModel> {
		const foundUser = await this.findUserByEmailRepository.findByEmail(email);

		if (!foundUser) {
			throw new Error("Não foi encontrado nenhum usuário com o email informado");
		}

		await this.updateUserRepository.update(email, createUserData);

		return {
			id: "",
			CPF: "",
			nome: "",
			email: "",
			sexo: "Feminino",
			telefone: "",
			dataNascimento: new Date(),
		};
	}
}
