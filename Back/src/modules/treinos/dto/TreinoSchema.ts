import { z } from "zod";

export const TreinoSchema = z.object({
  name: z.string().min(1, { message: "O nome não pode estar vazio" }),
  notes: z.string().optional(),
});
