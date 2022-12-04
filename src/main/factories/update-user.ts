import { UpdateUser } from "../../application/usecases/update-user/update-user";
import { UsersPrismaRepository } from "../../infra/database/postgres/users-repository/users-repository";
import { UpdateUserController } from "../../presentation/controllers/update/update-user-controller";
import { IController } from "../../presentation/protocols/controller";

export const makeUpdateUserController = (): IController => {
	const findUserByEmailRepository = new UsersPrismaRepository();
	const updateUserRepository = new UsersPrismaRepository();
	const updateUser = new UpdateUser(findUserByEmailRepository, updateUserRepository);
	return new UpdateUserController(updateUser);
};
