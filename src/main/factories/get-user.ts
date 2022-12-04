import { GetUser } from "../../application/usecases/get-user/get-user";
import { UsersPrismaRepository } from "../../infra/database/postgres/users-repository/users-repository";
import { GetUserController } from "../../presentation/controllers/get/get-user-controller";
import { IController } from "../../presentation/protocols/controller";

export const makeGetUserController = (): IController => {
	const findUserByEmailRepository = new UsersPrismaRepository();
	const getUser = new GetUser(findUserByEmailRepository);
	return new GetUserController(getUser);
};
