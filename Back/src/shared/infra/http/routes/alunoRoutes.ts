import { container } from "tsyringe";
import { AlunoController } from "../../../../modules/alunos/controller/AlunoController";
import { Router } from "express";
import isAuth from "../middleware/isAuth";

const alunoRoutes = Router();
const alunoController = container.resolve(AlunoController);

alunoRoutes.post("/", isAuth, alunoController.create);
alunoRoutes.get("/", isAuth, alunoController.list);
alunoRoutes.put("/:id", isAuth, alunoController.update);
alunoRoutes.delete("/:id", isAuth, alunoController.delete);
alunoRoutes.get("/:id", isAuth, alunoController.findById);
alunoRoutes.get("/email/:email", isAuth, alunoController.findByEmail);
alunoRoutes.get("/cpf/:cpf", isAuth, alunoController.findByCpf);



export default alunoRoutes;
