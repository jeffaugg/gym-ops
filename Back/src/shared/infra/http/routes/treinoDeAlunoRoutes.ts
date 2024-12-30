import { container } from "tsyringe";
import { TreinoDeAlunoController } from "../../../../modules/treinosDeAlunos/controller/TreinoDeAlunoController";
import { Router } from "express";
import isAuth from "../middleware/isAuth";

const treinoDeAlunoRoutes = Router();
const treinoDeAlunoController = container.resolve(TreinoDeAlunoController);

treinoDeAlunoRoutes.post("/", isAuth, treinoDeAlunoController.create);
treinoDeAlunoRoutes.delete("/:id", isAuth, treinoDeAlunoController.delete);
treinoDeAlunoRoutes.get("/", isAuth, treinoDeAlunoController.list);
treinoDeAlunoRoutes.get("/:id", isAuth, treinoDeAlunoController.findById);
treinoDeAlunoRoutes.get(
  "/clients/:aluno_id",
  isAuth,
  treinoDeAlunoController.findByAlunoId,
);

export default treinoDeAlunoRoutes;
