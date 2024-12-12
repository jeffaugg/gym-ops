import { Router } from "express";
import isAuth from "../middleware/isAuth";
import UserController from "../../../../modules/user/controllers/UserController";

const authRoutes = Router();
const userController = new UserController();

authRoutes.post("/signup", userController.create);
authRoutes.post("/login", userController.login);
authRoutes.get("/testeAreaLogada", isAuth, userController.test);

export default authRoutes;
