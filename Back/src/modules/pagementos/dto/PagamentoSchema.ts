import { z } from "zod";

export const PagamentoSchema = z.object({
  id_aluno: z
    .number()
    .int()
    .positive({ message: "O id do aluno deve ser um número inteiro positivo" }),
  id_plano: z
    .number()
    .int()
    .positive({ message: "O id do plano deve ser um número inteiro positivo" }),
  status: z.boolean().default(true),
  payment: z.enum(["CARD", "BANK_SLIP", "MONEY", "PIX"], {
    message: "Tipo de pagamento inválido",
  }),
  expiration_date: z.date().optional(),
});
