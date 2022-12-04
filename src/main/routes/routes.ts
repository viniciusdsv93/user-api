import { Router } from "express";
import { expressAdaptRoute } from "../adapters/express-route-adapter";
import { makeCreateUserController } from "../factories/create-user";
import { makeDeleteUserController } from "../factories/delete-user";
import { makeGetUserController } from "../factories/get-user";
import { makeUpdateUserController } from "../factories/update-user";

const router = Router();

router.post("/create", expressAdaptRoute(makeCreateUserController()));
router.get("/get/:email", expressAdaptRoute(makeGetUserController()));
router.delete("/delete/:email", expressAdaptRoute(makeDeleteUserController()));
router.put("/update/:email", expressAdaptRoute(makeUpdateUserController()));

export { router };
