import { Router } from "express";
import { AvaliacaoController } from "../../../../modules/avaliacoes/controller/AvaliacaoController";

const avaliacaoRoutes = Router();
const avaliacaoController = new AvaliacaoController();

avaliacaoRoutes.post("/", avaliacaoController.create);

export default avaliacaoRoutes;
