import { ServerError } from "../errors/server-error";
import { HttpResponse } from "../protocols/http";

export const badRequest = (error: Error): HttpResponse => {
	return {
		statusCode: 400,
		body: error,
	};
};

export const ok = (data: any): HttpResponse => {
	return {
		statusCode: 200,
		body: data,
	};
};

export const created = (data: any): HttpResponse => {
	return {
		statusCode: 201,
		body: data,
	};
};

export const serverError = (error: Error): HttpResponse => {
	return {
		statusCode: 500,
		body: error,
	};
};

export const notFound = (error: Error): HttpResponse => {
	return {
		statusCode: 404,
		body: error,
	};
};

export const noContent = (): HttpResponse => {
	return {
		statusCode: 204,
	};
};
