import { IAddUserRepository } from "../../../../application/protocols/add-user-respository";
import { UserModel } from "../../../../domain/models/user";
import { CreateUserModel } from "../../../../domain/usecases/create-user";
import { prismaClient } from "../prisma/prisma-client";

export class UsersPrismaRepository implements IAddUserRepository {
	async add(createUserData: CreateUserModel): Promise<UserModel> {
		const { nome, CPF, email, telefone, sexo, dataNascimento } = createUserData;
		const [day, month, year] = dataNascimento.split("/");
		const formattedDate = new Date(Number(year), Number(month) - 1, Number(day));
		return await prismaClient.user.create({
			data: {
				nome,
				CPF,
				email,
				telefone,
				sexo,
				dataNascimento: formattedDate,
			},
		});
	}
}
