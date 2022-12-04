import { CreateUser } from "../../application/usecases/create-user/create-user";
import { UsersPrismaRepository } from "../../infra/database/postgres/users-repository/users-repository";
import { CreateUserController } from "../../presentation/controllers/create/create-user-controller";
import { IController } from "../../presentation/protocols/controller";

export const makeCreateUserController = (): IController => {
	const usersPrismaRepository = new UsersPrismaRepository();
	const findUserByEmailRepository = new UsersPrismaRepository();
	const findUserByCPFRepository = new UsersPrismaRepository();
	const createUser = new CreateUser(
		usersPrismaRepository,
		findUserByEmailRepository,
		findUserByCPFRepository
	);
	return new CreateUserController(createUser);
};
