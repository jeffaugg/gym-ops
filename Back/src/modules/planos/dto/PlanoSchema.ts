import { z } from "zod";

export const PlanoSchema = z.object({
  name: z.string().min(1, { message: "O nome não pode estar vazio" }),
  price: z
    .number()
    .positive({ message: "O preço deve ser positivo" })
    .refine((price) => Number(price.toFixed(2)) === price, {
      message: "O preço deve ter no máximo duas casas decimais",
    }),
  duration: z
    .number()
    .int({ message: "duração deve ser um número inteiro" })
    .positive({ message: "duração deve ser em dias" })
    .min(1, { message: "duração mínima é de 1 dia" })
    .max(365, { message: "duração máxima é de 365 dias" }),
  spots: z.number().positive().nullable(),
});
