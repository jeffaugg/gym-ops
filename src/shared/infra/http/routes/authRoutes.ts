import { Router } from "express";
import UserController from "../controllers/UserController";
import isAuth from "../middleware/isAuth";


const authRoutes = Router();
const userController = new UserController();

authRoutes.post("/signup", userController.create);
authRoutes.post("/login", userController.login);
authRoutes.get("/testeAreaLogada", isAuth, userController.test);


export default authRoutes;