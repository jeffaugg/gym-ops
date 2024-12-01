import { Router } from "express";
import authRoutes from "./authRoutes";
import planoRoutes from "./planoRoutes";

const routes = Router();

routes.use(authRoutes);
routes.use("/plan", planoRoutes);

export default routes;
