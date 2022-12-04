import { UserModel } from "../models/user";
import { CreateUserModel } from "./create-user";

export interface IUpdateUser {
	update(email: string, createUserData: CreateUserModel): Promise<UserModel>;
}
