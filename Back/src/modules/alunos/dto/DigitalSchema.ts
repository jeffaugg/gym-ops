import { z } from "zod";
import { isBase64 } from "../../../shared/helpers/isBase64";

export const DigitalSchema = z.object({
  fmd: z.string().refine((val) => isBase64(val), {
    message: "FMD deve ser uma string Base64 válida",
  }),
});
