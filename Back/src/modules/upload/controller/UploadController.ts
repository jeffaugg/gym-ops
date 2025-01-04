import { Request, Response } from "express";
import { UploadService } from "../service/UploadService";
import AppError from "../../../shared/errors/AppError";
import { GoogleDriveService } from "../service/GoogleDriveService";

export class UploadController {
  private uploadService: UploadService;
  private googleDriveService = new GoogleDriveService();
  constructor(folder: string) {
    this.uploadService = new UploadService(folder);
  }

  public uploadMiddleware() {
    return this.uploadService.getMulterMiddleware();
  }

  public async handle(req: Request, res: Response) {
    try {
      const filePath = UploadService.getUploadedFilePath(req);
      const fileName = req.file.originalname;
      const fileId = await this.googleDriveService.uploadFile(
        filePath,
        fileName,
      );
      return res.status(200).json({
        message: "Upload realizado com sucesso!",
        fileId,
        driveLink: `https://drive.google.com/file/d/${fileId}/view`,
      });
    } catch (err) {
      throw new AppError(err.message, 400);
    }
  }
}
