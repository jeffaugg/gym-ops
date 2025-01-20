import { z } from "zod";

export const TreinoDeAlunoSchema = z.object({
  aluno_id: z
    .number()
    .int()
    .positive({ message: "O ID do aluno deve ser um número válido" }),
  treino_id: z
    .number()
    .int()
    .positive({ message: "O ID do treino deve ser um número válido" }),
});
