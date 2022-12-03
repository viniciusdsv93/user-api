import { IAddUserRepository } from "../../../../application/protocols/add-user-respository";
import { UserModel } from "../../../../domain/models/user";
import { CreateUserModel } from "../../../../domain/usecases/create-user";
import { prismaClient } from "../prisma/prisma-client";

export class UsersPrismaRepository implements IAddUserRepository {
	async add(createUserData: CreateUserModel): Promise<UserModel> {
		const { nome, CPF, email, telefone, sexo, dataNascimento } = createUserData;
		return await prismaClient.user.create({
			data: {
				nome,
				CPF,
				email,
				telefone,
				sexo,
				dataNascimento,
			},
		});
	}
}
