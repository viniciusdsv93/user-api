export interface IDeleteUser {
	delete(email: string): Promise<void>;
}
