import { UsersPrismaRepository } from "./users-repository";

describe("Prisma Users Repository", () => {
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
		expect(response).toBe("");
	});
});
