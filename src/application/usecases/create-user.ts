import { UserModel } from "../../domain/models/user";
import { CreateUserModel, ICreateUser } from "../../domain/usecases/create-user";
import { IAddUserRepository } from "../protocols/add-user-respository";
import { IFindUserByEmailRepository } from "../protocols/find-by-email-repository";

export class CreateUser implements ICreateUser {
	private readonly addUserRepository: IAddUserRepository;
	private readonly findUserByEmailRepository: IFindUserByEmailRepository;

	constructor(
		addUserRepository: IAddUserRepository,
		findUserByEmailRepository: IFindUserByEmailRepository
	) {
		this.addUserRepository = addUserRepository;
		this.findUserByEmailRepository = findUserByEmailRepository;
	}

	async create(createUserData: CreateUserModel): Promise<UserModel> {
		await this.findUserByEmailRepository.findByEmail(createUserData.email);
		const result = await this.addUserRepository.add(createUserData);
		return result;
	}
}
