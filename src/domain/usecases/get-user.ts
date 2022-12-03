import { UserModel } from "../models/user";

export interface IGetUser {
	get(email: string): Promise<UserModel>;
}
