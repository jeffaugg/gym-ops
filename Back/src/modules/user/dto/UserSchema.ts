import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(1, { message: "O nome não pode estar vazio" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: "CPF deve estar no formato XXX.XXX.XXX-XX",
  }),
  tel: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
    message: "Telefone deve estar no formato (XX) XXXXX-XXXX",
  }),
  role: z.string().refine((val) => ["ADM", "USER"].includes(val), {
    message: "Role inválida",
  }),
});
