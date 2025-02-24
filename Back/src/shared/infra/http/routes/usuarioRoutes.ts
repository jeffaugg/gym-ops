import { Router } from "express";
import isAuth from "../middleware/isAuth";
import UserController from "../../../../modules/user/controllers/UserController";
import { container } from "tsyringe";

const authRoutes = Router();
const userController = container.resolve(UserController);

authRoutes.post("/signupadm", userController.createAdm);
authRoutes.post("/signupuser", isAuth, userController.createUser);
authRoutes.get("/allusers", isAuth, userController.getAllUsers);
authRoutes.post("/login", userController.login);
authRoutes.get("/testeAreaLogada", isAuth, userController.test);
authRoutes.get("/me", isAuth, (req, res) => res.json({ user: req.user }));
authRoutes.get("/:id", isAuth, userController.findUserById);
authRoutes.put("/", isAuth, userController.updateUser);
authRoutes.delete("/:id", isAuth, userController.deleteUser);
authRoutes.put("/:id", isAuth, userController.updateInstrutor);
export default authRoutes;
