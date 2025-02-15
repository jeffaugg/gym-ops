import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

interface CheckMatchResponse {
  match: boolean;
}

export async function checkMatch(DataFmd, CompareFmd): Promise<boolean> {
  const response = await axios.post<CheckMatchResponse>(
    `${process.env.READER_API_HOST}/check_match`,
    {
      fmd1: DataFmd.toString("base64"),
      fmd2: CompareFmd.toString("base64"),
    },
  );

  return response.data.match;
}
