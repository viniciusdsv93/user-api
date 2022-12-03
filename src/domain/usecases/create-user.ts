import { UserModel } from "../models/user";

export type CreateUserModel = {
	nome: string;
	CPF: string;
	email: string;
	telefone: string;
	sexo: "Masculino" | "Feminino" | "Outro";
	dataNascimento: string;
};

export interface ICreateUser {
	create(createUserData: CreateUserModel): Promise<UserModel>;
}
