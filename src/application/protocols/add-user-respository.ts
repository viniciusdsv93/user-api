import { UserModel } from "../../domain/models/user";
import { CreateUserModel } from "../../domain/usecases/create-user";

export interface IAddUserRepository {
	add(createUserData: CreateUserModel): Promise<UserModel>;
}
