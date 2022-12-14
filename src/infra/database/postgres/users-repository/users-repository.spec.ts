import { CreateUserModel } from "../../../../domain/usecases/create-user";
import { prismaClient } from "../prisma/prisma-client";
import { UsersPrismaRepository } from "./users-repository";

const makeFakeCreateUserModel = (): CreateUserModel => {
	return {
		nome: "Jorge",
		CPF: "44444444444",
		email: "jorge@mail.com",
		telefone: "44444444",
		sexo: "Masculino",
		dataNascimento: "15/10/1980",
	};
};

describe("Prisma Users Repository", () => {
	afterEach(async () => {
		await prismaClient.user.deleteMany();
	});

	test("Should return an user on add success", async () => {
		const sut = new UsersPrismaRepository();
		const response = await sut.add(makeFakeCreateUserModel());
		expect(response).toBeTruthy();
		expect(response).toHaveProperty("id");
		expect(response).toHaveProperty("nome", "Jorge");
		expect(response).toHaveProperty("CPF", "44444444444");
		expect(response).toHaveProperty("email", "jorge@mail.com");
		expect(response).toHaveProperty("telefone", "44444444");
		expect(response).toHaveProperty("sexo", "Masculino");
		expect(response).toHaveProperty("dataNascimento", new Date(1980, 10 - 1, 15));
	});

	test("Should return an user on findByEmail success", async () => {
		const sut = new UsersPrismaRepository();
		await sut.add(makeFakeCreateUserModel());
		const result = await sut.findByEmail("jorge@mail.com");
		expect(result).toBeTruthy();
		expect(result).toHaveProperty("id");
		expect(result).toHaveProperty("nome", "Jorge");
		expect(result).toHaveProperty("CPF", "44444444444");
		expect(result).toHaveProperty("email", "jorge@mail.com");
		expect(result).toHaveProperty("telefone", "44444444");
		expect(result).toHaveProperty("sexo", "Masculino");
		expect(result).toHaveProperty("dataNascimento", new Date(1980, 10 - 1, 15));
	});

	test("Should return null on findByEmail failure", async () => {
		const sut = new UsersPrismaRepository();
		const result = await sut.findByEmail("jorge@mail.com");
		expect(result).toBeNull();
	});

	test("Should return an user on findByCPF success", async () => {
		const sut = new UsersPrismaRepository();
		await sut.add(makeFakeCreateUserModel());
		const result = await sut.findByCPF("44444444444");
		expect(result).toBeTruthy();
		expect(result).toHaveProperty("id");
		expect(result).toHaveProperty("nome", "Jorge");
		expect(result).toHaveProperty("CPF", "44444444444");
		expect(result).toHaveProperty("email", "jorge@mail.com");
		expect(result).toHaveProperty("telefone", "44444444");
		expect(result).toHaveProperty("sexo", "Masculino");
		expect(result).toHaveProperty("dataNascimento", new Date(1980, 10 - 1, 15));
	});

	test("Should return null on findByCPF failure", async () => {
		const sut = new UsersPrismaRepository();
		const result = await sut.findByCPF("44444444444");
		expect(result).toBeNull();
	});

	test("Should throw on delete failure", async () => {
		const sut = new UsersPrismaRepository();
		const promise = sut.delete("jorge@mail.com");
		await expect(promise).rejects.toThrow();
	});

	test("Should not find user by email after delete success", async () => {
		const sut = new UsersPrismaRepository();
		await sut.add(makeFakeCreateUserModel());
		const resultBeforeDelete = await sut.findByEmail("jorge@mail.com");
		expect(resultBeforeDelete).toBeTruthy();
		await sut.delete("jorge@mail.com");
		const resultAfterDelete = await sut.findByEmail("jorge@mail.com");
		expect(resultAfterDelete).toBeNull();
	});

	test("Should throw on update failure", async () => {
		const sut = new UsersPrismaRepository();
		const promise = sut.update("jorge@mail.com", {
			nome: "Jorge Alterado",
			CPF: "55555555555",
			email: "jorge_alterado@mail.com",
			telefone: "55555555",
			sexo: "Outro",
			dataNascimento: "15/10/1985",
		});
		await expect(promise).rejects.toThrow();
	});

	test("Should return update user data on update success", async () => {
		const sut = new UsersPrismaRepository();
		await sut.add(makeFakeCreateUserModel());
		const result = await sut.update("jorge@mail.com", {
			nome: "Jorge Alterado",
			CPF: "55555555555",
			email: "jorge_alterado@mail.com",
			telefone: "55555555",
			sexo: "Outro",
			dataNascimento: "15/10/1985",
		});
		expect(result).toBeTruthy();
		expect(result).toHaveProperty("id");
		expect(result).toHaveProperty("nome", "Jorge Alterado");
		expect(result).toHaveProperty("CPF", "55555555555");
		expect(result).toHaveProperty("email", "jorge_alterado@mail.com");
		expect(result).toHaveProperty("telefone", "55555555");
		expect(result).toHaveProperty("sexo", "Outro");
		expect(result).toHaveProperty("dataNascimento", new Date(1985, 10 - 1, 15));
	});
});
