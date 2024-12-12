import { z } from "zod";

export const AlunoSchema = z.object({
  name: z.string().min(1, { message: "O nome não pode estar vazio" }),
  date_of_birth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" })
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "A data deve estar no formato yyyy-mm-dd",
    }),
  email: z.string().email({ message: "Email inválido" }),
  telephone: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
    message: "Telefone deve estar no formato (XX) XXXXX-XXXX",
  }),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: "CPF deve estar no formato XXX.XXX.XXX-XX",
  }),
  plan_id: z.number().int().positive({ message: "ID do plano inválido" }),
});
