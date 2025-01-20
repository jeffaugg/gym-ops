import multer, { StorageEngine } from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import AppError from "../../errors/AppError";

interface MulterConfigOptions {
  folder: string;
}
export const multerConfig = ({
  folder,
}: MulterConfigOptions): multer.Multer => {
  const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
      const uploadFolder = path.resolve(__dirname, "uploads", folder);

      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true });
      }

      callback(null, uploadFolder);
    },

    filename: (req, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      callback(null, fileName);
    },
  });

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
      const allwedMimes = [`image/jpeg`, `image/png`, `application/pdf`];

      if (!allwedMimes.includes(file.mimetype)) {
        callback(new AppError("Invalid file type", 401));
      }

      callback(null, true);
    },
  });
};
