import { IAddUserRepository } from "../../../../application/protocols/add-user-respository";
import { IDeleteUserRepository } from "../../../../application/protocols/delete-user-repository";
import { IFindUserByCPFRepository } from "../../../../application/protocols/find-by-cpf-repository";
import { IFindUserByEmailRepository } from "../../../../application/protocols/find-by-email-repository";
import { UserModel } from "../../../../domain/models/user";
import { CreateUserModel } from "../../../../domain/usecases/create-user";
import { prismaClient } from "../prisma/prisma-client";

export class UsersPrismaRepository
	implements
		IAddUserRepository,
		IFindUserByEmailRepository,
		IFindUserByCPFRepository,
		IDeleteUserRepository
{
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

	async findByEmail(email: string): Promise<UserModel | null> {
		return await prismaClient.user.findUnique({
			where: {
				email,
			},
		});
	}

	async findByCPF(cpf: string): Promise<UserModel | null> {
		return await prismaClient.user.findUnique({
			where: {
				CPF: cpf,
			},
		});
	}

	async delete(email: string): Promise<void> {
		await prismaClient.user.delete({
			where: {
				email,
			},
		});
	}
}
