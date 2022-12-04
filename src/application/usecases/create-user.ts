import { UserModel } from "../../domain/models/user";
import { CreateUserModel, ICreateUser } from "../../domain/usecases/create-user";
import { IAddUserRepository } from "../protocols/add-user-respository";
import { IFindUserByCPFRepository } from "../protocols/find-by-cpf-repository";
import { IFindUserByEmailRepository } from "../protocols/find-by-email-repository";

export class CreateUser implements ICreateUser {
	private readonly addUserRepository: IAddUserRepository;
	private readonly findUserByEmailRepository: IFindUserByEmailRepository;
	private readonly findUserByCPFRepository: IFindUserByCPFRepository;

	constructor(
		addUserRepository: IAddUserRepository,
		findUserByEmailRepository: IFindUserByEmailRepository,
		findUserByCPFRepository: IFindUserByCPFRepository
	) {
		this.addUserRepository = addUserRepository;
		this.findUserByEmailRepository = findUserByEmailRepository;
		this.findUserByCPFRepository = findUserByCPFRepository;
	}

	async create(createUserData: CreateUserModel): Promise<UserModel> {
		const userExistsWithEmail = await this.findUserByEmailRepository.findByEmail(
			createUserData.email
		);

		if (userExistsWithEmail) {
			throw new Error("Já existe um usuário cadastrado com este email");
		}

		await this.findUserByCPFRepository.findByCPF(createUserData.CPF);

		const result = await this.addUserRepository.add(createUserData);
		return result;
	}
}
