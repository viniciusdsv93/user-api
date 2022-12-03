import { UserModel } from "../models/user";

export interface IUpdateUser {
	update(email: string): Promise<UserModel>;
}
