import { z } from "zod";

export const ExercicioDeTreinoSchema = z.object({
  treino_id: z.number().int().positive({ message: "O ID do treino deve ser um número válido" }),
  exercicio_id: z.number().int().positive({ message: "O ID do exercício deve ser um número válido" }),
  series: z.number()
    .int()
    .positive({ message: "O número de séries deve ser maior que zero" }),
  repeticoes: z.number()
    .int()
    .positive({ message: "O número de repetições deve ser maior que zero" }),
  descanso_segundos: z.number()
    .int()
    .nonnegative({ message: "O descanso em segundos deve ser um número não negativo" }),
});