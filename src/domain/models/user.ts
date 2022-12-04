export type UserModel = {
	id: string;
	nome: string;
	CPF: string;
	email: string;
	telefone: string;
	sexo: "Masculino" | "Feminino" | "Outro";
	dataNascimento: Date;
};
