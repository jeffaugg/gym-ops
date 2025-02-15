import { Router } from "express";
import { container } from "tsyringe";
import { DigitalController } from "../../../../modules/alunos/controller/DigitalController";

const digitalRoutes = Router();
const digitalController = container.resolve(DigitalController);
digitalRoutes.post("/", digitalController.fingerprintByAluno);

export default digitalRoutes;
