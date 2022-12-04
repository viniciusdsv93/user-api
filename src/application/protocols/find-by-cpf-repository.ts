import { UserModel } from "../../domain/models/user";

export interface IFindUserByCPFRepository {
	findByCPF(cpf: string): Promise<UserModel | null>;
}
