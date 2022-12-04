import { CreateUser } from "../../application/usecases/create-user";
import { UsersPrismaRepository } from "../../infra/database/postgres/users-repository/users-repository";
import { CreateUserController } from "../../presentation/controllers/create/create-user-controller";
import { IController } from "../../presentation/controllers/protocols/controller";

export const makeCreateUserController = (): IController => {
	const usersPrismaRepository = new UsersPrismaRepository();
	const createUser = new CreateUser(usersPrismaRepository);
	return new CreateUserController(createUser);
};
