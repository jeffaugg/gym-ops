import { Router } from "express";
import authRoutes from "./authRoutes";
import planoRoutes from "./planoRoutes";
import alunoRoutes from "./alunoRoutes";

const routes = Router();

routes.use(authRoutes);
routes.use("/plan", planoRoutes);
routes.use("/clients", alunoRoutes);

export default routes;
