import { container } from "tsyringe";
import { AlunoController } from "../../../../modules/alunos/controller/AlunoController";
import { Router } from "express";

const alunoRoutes = Router();
const alunoController = container.resolve(AlunoController);

alunoRoutes.post("/", alunoController.create);
alunoRoutes.get("/", alunoController.list);
alunoRoutes.put("/:id", alunoController.update);
alunoRoutes.delete("/:id", alunoController.delete);
alunoRoutes.get("/:id", alunoController.findById);
alunoRoutes.get("/email/:email", alunoController.findByEmail);
alunoRoutes.get("/cpf/:cpf", alunoController.findByCpf);



export default alunoRoutes;
