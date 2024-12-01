import { Router } from "express";
import authRoutes from "./authRoutes";

const routes = Router();

routes.use(authRoutes);

export default routes;