import { Router } from "express";
import { UploadController } from "../../../../modules/upload/controller/UploadController";

const uploadRoutes = Router();
const uploadController = new UploadController("fotos_avaliacoes");

uploadRoutes.post("/reviews", uploadController.uploadMiddleware(), (req, res) =>
  uploadController.handle(req, res),
);

export default uploadRoutes;
