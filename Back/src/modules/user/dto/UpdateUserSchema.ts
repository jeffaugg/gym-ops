import { z } from "zod";

export const UpdateUserSchema = z
  .object({
    name: z.string().min(1, { message: "O nome não pode estar vazio" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
      .optional(),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: "CPF deve estar no formato XXX.XXX.XXX-XX",
    }),
    tel: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
      message: "Telefone deve estar no formato (XX) XXXXX-XXXX",
    }),
    role: z.enum(["USER", "ADM"], { message: "Role inválida" }),
    cref: z.string().optional(),
    daysofweek: z.array(z.number().max(7).min(0)).optional(),
    turntime: z
      .number()
      .max(3, { message: "O turno inválido" })
      .min(1, { message: "O turno inválido" })
      .optional(),
    gender: z.enum(["M", "F", "O"], { message: "Gênero inválido" }).optional(),
    date_of_birth: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" })
      .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
        message: "A data deve estar no formato yyyy-mm-dd",
      })
      .optional(),
    status: z.boolean().optional().default(true),
  })
  .refine(
    (data) => {
      if (data.role === "USER" && !data.cref) {
        return false;
      }
      return true;
    },
    {
      message: "CREF é obrigatório para usuários com role 'USER'",
      path: ["cref"],
    },
  )
  .refine(
    (data) => {
      if (
        data.role === "USER" &&
        (data.daysofweek?.length === 0 || !data.daysofweek)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Dia da semana é obrigatório para usuários com role 'USER'",
      path: ["daysofweek"],
    },
  )
  .refine(
    (data) => {
      if (data.role === "USER" && !data.turntime) {
        return false;
      }
      return true;
    },
    {
      message: "Turno é obrigatório para usuários com role 'USER'",
      path: ["turntime"],
    },
  )
  .refine(
    (data) => {
      if (data.role === "USER" && !data.gender) {
        return false;
      }
      return true;
    },
    {
      message: "Gênero é obrigatório para usuários com role 'USER'",
    },
  )
  .refine(
    (data) => {
      if (data.role === "USER" && !data.date_of_birth) {
        return false;
      }
      return true;
    },
    {
      message: "Data de nascimento é obrigatória para usuários com role 'USER'",
    },
  );
