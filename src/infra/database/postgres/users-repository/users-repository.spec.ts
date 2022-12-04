import { prismaClient } from "../prisma/prisma-client";
import { UsersPrismaRepository } from "./users-repository";

describe("Prisma Users Repository", () => {
	afterAll(async () => {
		await prismaClient.user.deleteMany();
	});

	test("Should return an user on add success", async () => {
		const sut = new UsersPrismaRepository();
		const response = await sut.add({
			nome: "Jorge",
			CPF: "44444444444",
			email: "jorge@mail.com",
			telefone: "44444444",
			sexo: "Masculino",
			dataNascimento: "15/10/1980",
		});
		expect(response).toBeTruthy();
		expect(response).toHaveProperty("id");
		expect(response).toHaveProperty("nome", "Jorge");
		expect(response).toHaveProperty("CPF", "44444444444");
		expect(response).toHaveProperty("email", "jorge@mail.com");
		expect(response).toHaveProperty("telefone", "44444444");
		expect(response).toHaveProperty("sexo", "Masculino");
		expect(response).toHaveProperty("dataNascimento", new Date(1980, 10 - 1, 15));
	});
});
