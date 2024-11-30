import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";

const routes = Router();
routes.use(userRoutes);
routes.use(authRoutes);

export default routes;