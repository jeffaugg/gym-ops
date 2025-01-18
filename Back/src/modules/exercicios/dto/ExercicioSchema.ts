import { z } from "zod";

export const ExercicioSchema = z.object({
  name: z.string().min(1, { message: "O nome não pode estar vazio" }),
  muscles: z.string().min(1, {
    message: "Os musculos treinados no exercicio não pode ser vazio",
  }),
});
