import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface CheckMatchResponse {
  match: boolean;
}

export async function checkMatch(
  DataFmd: Buffer,
  CompareFmd: Buffer,
): Promise<boolean> {
  try {
    if (!process.env.READER_API_HOST) {
      throw new Error("READER_API_HOST não está definido no .env");
    }

    if (!Buffer.isBuffer(DataFmd) || !Buffer.isBuffer(CompareFmd)) {
      throw new Error("Os parâmetros fornecidos não são Buffers válidos.");
    }

    const fmd1Base64 = DataFmd.toString("base64");
    const fmd2Base64 = CompareFmd.toString("base64");

    const response = await axios.post<CheckMatchResponse>(
      `${process.env.READER_API_HOST}/check_match`,
      { fmd1: fmd1Base64, fmd2: fmd2Base64 },
    );

    return response.data.match;
  } catch (error) {
    console.error("Erro ao verificar match de digitais:", error);
    return false;
  }
}
