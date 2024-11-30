import { Router } from "express";
import * as SessionController from "../controllers/SessionController";
import UserController from "../controllers/UserController";
import isAuth from "../middleware/isAuth";
import envTokenAuth from "../middleware/envTokenAuth";


const authRoutes = Router();
const userController = new UserController();
authRoutes.post("/signup", envTokenAuth, userController.create);
authRoutes.post("/login", SessionController.store);
authRoutes.post("/refresh_token", SessionController.update);
authRoutes.delete("/logout", isAuth, SessionController.remove);
authRoutes.get("/me", isAuth, SessionController.me);

export default authRoutes;