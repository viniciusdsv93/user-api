import { Router } from "express";
import { expressAdaptRoute } from "../adapters/express-route-adapter";
import { makeCreateUserController } from "../factories/create-user";
import { makeGetUserController } from "../factories/get-user";

const router = Router();

router.post("/create", expressAdaptRoute(makeCreateUserController()));
router.get("/get/:email", expressAdaptRoute(makeGetUserController()));

export { router };
