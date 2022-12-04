import { DeleteUser } from "../../application/usecases/delete-user/delete-user";
import { UsersPrismaRepository } from "../../infra/database/postgres/users-repository/users-repository";
import { DeleteUserController } from "../../presentation/controllers/delete/delete-user";
import { IController } from "../../presentation/protocols/controller";

export const makeDeleteUserController = (): IController => {
	const findUserByEmailRepository = new UsersPrismaRepository();
	const deleteUserRepository = new UsersPrismaRepository();
	const deleteUser = new DeleteUser(findUserByEmailRepository, deleteUserRepository);
	return new DeleteUserController(deleteUser);
};
