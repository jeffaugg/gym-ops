import { Router } from "express";
import authRoutes from "./authRoutes";
import planoRoutes from "./planoRoutes";
import alunoRoutes from "./alunoRoutes";
import avaliacaoRoutes from "./avaliacaoRoutes";
import exercicioRoutes from "./exercicioRoutes";
import treinoRoutes from "./treinoRoutes";
import exercicioDeTreinoRoutes from "./exercicioDeTreinoRoutes";
import treinoDeAlunoRoutes from "./treinoDeAlunoRoutes";
import mensagemRoutes from "./mensagemRoutes";

const routes = Router();

routes.use(authRoutes);
routes.use("/plan", planoRoutes);
routes.use("/clients", alunoRoutes);
routes.use("/reviews", avaliacaoRoutes);
routes.use("/exercises", exercicioRoutes);
routes.use("/workouts", treinoRoutes);
routes.use("/exercises-workouts", exercicioDeTreinoRoutes);
routes.use("/workouts-clients", treinoDeAlunoRoutes);
routes.use("/message", mensagemRoutes);

export default routes;
