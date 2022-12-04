export class NotFoundError extends Error {
	constructor(paramName: string, message: string) {
		super(`Not found by: ${paramName}`);
		this.name = "NotFoundError";
		this.message = message;
	}
}
