import { Router } from "express";
import authRoutes from "./authRoutes";
import planoRoutes from "./planoRoutes";
import alunoRoutes from "./alunoRoutes";
import avaliacaoRoutes from "./avaliacaoRoutes";
import exercicioRoutes from "./treinoRoutes";
import treinoRoutes from "./treinoRoutes";
import exerciciosDeTreinosRoutes from "./exerciciosDeTreinosRoutes";

const routes = Router();

routes.use(authRoutes);
routes.use("/plan", planoRoutes);
routes.use("/clients", alunoRoutes);
routes.use("/reviews", avaliacaoRoutes);
routes.use("/exercises", exercicioRoutes);
routes.use("/workouts", treinoRoutes);
routes.use("/exercises-workout", exerciciosDeTreinosRoutes);

export default routes;
