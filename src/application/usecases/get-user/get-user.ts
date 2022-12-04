import { UserModel } from "../../../domain/models/user";
import { IGetUser } from "../../../domain/usecases/get-user";
import { IFindUserByEmailRepository } from "../../protocols/find-by-email-repository";

export class GetUser implements IGetUser {
	private readonly findUserByEmailRepository: IFindUserByEmailRepository;

	constructor(findUserByEmailRepository: IFindUserByEmailRepository) {
		this.findUserByEmailRepository = findUserByEmailRepository;
	}

	async get(email: string): Promise<UserModel | null> {
		return await this.findUserByEmailRepository.findByEmail(email);
	}
}
