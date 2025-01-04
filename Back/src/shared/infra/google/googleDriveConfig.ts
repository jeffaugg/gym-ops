import { google } from "googleapis";

export const auth = new google.auth.GoogleAuth({
  keyFile: "D:/www/gym-ops/Back/src/shared/infra/google/googledrive.json",
  scopes: ["https://www.googleapis.com/auth/drive"],
});

export const drive = google.drive({ version: "v3", auth });
