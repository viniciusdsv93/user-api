import { UserModel } from "../../../domain/models/user";
import { CreateUserModel } from "../../../domain/usecases/create-user";
import { IUpdateUser } from "../../../domain/usecases/update-user";
import { IFindUserByEmailRepository } from "../../protocols/find-by-email-repository";

export class UpdateUser implements IUpdateUser {
	private readonly findUserByEmailRepository: IFindUserByEmailRepository;

	constructor(findUserByEmailRepository: IFindUserByEmailRepository) {
		this.findUserByEmailRepository = findUserByEmailRepository;
	}

	async update(email: string, createUserData: CreateUserModel): Promise<UserModel> {
		await this.findUserByEmailRepository.findByEmail(email);
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
