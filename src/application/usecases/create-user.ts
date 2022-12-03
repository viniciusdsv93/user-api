import { UserModel } from "../../domain/models/user";
import { CreateUserModel, ICreateUser } from "../../domain/usecases/create-user";
import { IAddUserRepository } from "../protocols/add-user-respository";

export class CreateUser implements ICreateUser {
	private readonly addUserRepository: IAddUserRepository;

	constructor(addUserRepository: IAddUserRepository) {
		this.addUserRepository = addUserRepository;
	}

	async create(createUserData: CreateUserModel): Promise<UserModel> {
		const result = await this.addUserRepository.add(createUserData);
		return result;
	}
}
