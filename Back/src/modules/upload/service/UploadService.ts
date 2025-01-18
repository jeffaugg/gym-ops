import { Request } from "express";
import { multerConfig } from "../../../shared/infra/multer/multerConfig";
import AppError from "../../../shared/errors/AppError";
import multer from "multer";

export class UploadService {
  private upload: multer.Multer;
  constructor(folder: string) {
    this.upload = multerConfig({ folder });
  }

  public getMulterMiddleware() {
    return this.upload.single("file");
  }

  public static getUploadedFilePath(req: Request): string {
    if (!req.file) {
      throw new AppError("Nenhum arquivo foi enviado.", 400);
    }
    return req.file.path;
  }
}
