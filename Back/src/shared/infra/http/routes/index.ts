import { Router } from "express";
import authRoutes from "./usuarioRoutes";
import planoRoutes from "./planoRoutes";
import alunoRoutes from "./alunoRoutes";
import avaliacaoRoutes from "./avaliacaoRoutes";
import exercicioRoutes from "./exercicioRoutes";
import treinoRoutes from "./treinoRoutes";
import exercicioDeTreinoRoutes from "./exercicioDeTreinoRoutes";
import treinoDeAlunoRoutes from "./treinoDeAlunoRoutes";
import mensagemRoutes from "./mensagemRoutes";
import pagamentoRoutes from "./pagamentoRoutes";
import uploadRoutes from "./uploadRoutes";
import presencaRoutes from "./presencaRoutes";

const routes = Router();

routes.use("/user", authRoutes);
routes.use("/plan", planoRoutes);
routes.use("/clients", alunoRoutes);
routes.use("/reviews", avaliacaoRoutes);
routes.use("/exercises", exercicioRoutes);
routes.use("/workouts", treinoRoutes);
routes.use("/exercises-workouts", exercicioDeTreinoRoutes);
routes.use("/workouts-clients", treinoDeAlunoRoutes);
routes.use("/message", mensagemRoutes);
routes.use("/pay", pagamentoRoutes);
routes.use("/upload", uploadRoutes);
routes.use("/presence", presencaRoutes);
export default routes;
