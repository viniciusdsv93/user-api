import { UserModel } from "../../domain/models/user";
import { CreateUserModel } from "../../domain/usecases/create-user";

export interface IUpdateUserRepository {
	update(email: string, createUserData: CreateUserModel): Promise<UserModel>;
}
