import { google } from "googleapis";
import path from "path";

const keyFilePath = path.resolve(__dirname, "googledrive.json");

export const auth = new google.auth.GoogleAuth({
  keyFile: keyFilePath,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

export const drive = google.drive({ version: "v3", auth });
