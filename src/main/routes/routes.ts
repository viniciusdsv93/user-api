import { Router } from "express";
import { expressAdaptRoute } from "../adapters/express-route-adapter";
import { makeCreateUserController } from "../factories/create-user";

const router = Router();

router.post("/create", expressAdaptRoute(makeCreateUserController()));

export { router };
