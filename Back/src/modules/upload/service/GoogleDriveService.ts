import fs from "fs";
import { drive } from "../../../shared/infra/google/googleDriveConfig";

const folderId = process.env.GOOGLE_API_FOLDER_ID;

export class GoogleDriveService {
  async uploadFile(filePath: string, fileName: string) {
    try {
      const fileMetadata = { name: fileName, parents: [folderId] };
      const media = {
        mimeType: "application/octet-stream",
        body: fs.createReadStream(filePath),
      };

      const response = await drive.files.create({
        requestBody: fileMetadata,
        media,
        fields: "id",
      });

      const fileId = response.data.id;

      await drive.permissions.create({
        fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      return response.data.id;
    } finally {
      fs.unlinkSync(filePath);
    }
  }
}
