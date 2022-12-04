export interface IDeleteUserRepository {
	delete(email: string): Promise<void>;
}
