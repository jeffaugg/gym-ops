import { Request, Response } from "express";
import { UploadService } from "../service/UploadService";
import AppError from "../../../shared/errors/AppError";

export class UploadController {
  private uploadService: UploadService;
  constructor(folder: string) {
    this.uploadService = new UploadService(folder);
  }

  public uploadMiddleware() {
    return this.uploadService.getMulterMiddleware();
  }

  public async handle(req: Request, res: Response) {
    try {
      const filePath = UploadService.getUploadedFilePath(req);
      return res.status(200).json({ filePath });
    } catch (err) {
      throw new AppError(err.message, 400);
    }
  }
}
