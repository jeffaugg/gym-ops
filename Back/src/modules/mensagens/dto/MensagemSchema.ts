import { z } from "zod";

export const MensagemSchema = z.object({
  title: z.string().min(1, { message: "O título não pode estar vazio" }),
  body: z
    .string()
    .min(1, { message: "O corpo da mensagem não pode estar vazio" }),
  recipient_type: z.enum(["STUDENTS", "INSTRUCTORS", "ALL"], {
    message: "Tipo de destinatário inválido",
  }),
});
