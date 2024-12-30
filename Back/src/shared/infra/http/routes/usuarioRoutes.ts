import { Router } from "express";
import isAuth from "../middleware/isAuth";
import UserController from "../../../../modules/user/controllers/UserController";
import { container } from "tsyringe";

const authRoutes = Router();
const userController = container.resolve(UserController);

authRoutes.post("/signup", userController.create);
authRoutes.post("/login", userController.login);
authRoutes.put("/", isAuth, userController.update);
authRoutes.get("/testeAreaLogada", isAuth, userController.test);
authRoutes.get("/me", isAuth, (req, res) => res.json({ user: req.user }));

export default authRoutes;
