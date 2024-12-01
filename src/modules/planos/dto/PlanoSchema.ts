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
    .string()
    .min(3, { message: "A duração deve ter no mínimo 3 caracteres" }), // Dia, Semana, Mês, Anoz
});
