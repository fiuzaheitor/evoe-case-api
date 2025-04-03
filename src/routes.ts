const { Router } = require("express");
import * as usersController from "./controllers/usersController";

const routes = new Router();

//User routes
routes.get("/users", usersController.getAllUsers);
routes.get("/users/:id", usersController.getUserById);
routes.post("/users", usersController.createUserController);
routes.post("/users/login", usersController.loginUserController);
routes.put("/users/:id", usersController.updateUserController);

export default routes;
