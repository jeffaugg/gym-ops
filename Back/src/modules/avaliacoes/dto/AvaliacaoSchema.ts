import { z } from "zod";

export const AvaliacoesSchema = z.object({
  aluno_id: z.number().int().positive({ message: "ID do aluno inválido" }),
  height: z
    .number()
    .positive({ message: "Altura inválida" })
    .transform((val) => parseFloat(val.toFixed(2))),
  weight: z
    .number()
    .positive({ message: "Peso inválido" })
    .transform((val) => parseFloat(val.toFixed(2))),
  fat_mass: z
    .number()
    .positive({ message: "Valor inválido" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
  lean_mass: z
    .number()
    .positive({ message: "Valor inválido" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
  left_arm_relaxed: z
    .number()
    .positive({ message: "Valor inválido" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
  right_arm_relaxed: z
    .number()
    .positive({ message: "Valor inválido" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
  left_arm_contracted: z
    .number()
    .positive({ message: "Valor inválido" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
  right_arm_contracted: z
    .number()
    .positive({ message: "Valor inválido" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
  left_thigh: z
    .number()
    .positive({ message: "Valor inválido" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
  right_thigh: z
    .number()
    .positive({ message: "Valor inválido" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
  left_calf: z
    .number()
    .positive({ message: "Valor inválido" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
  right_calf: z
    .number()
    .positive({ message: "Valor inválido" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
  chest: z
    .number()
    .positive({ message: "Valor inválido" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
  abdomen: z
    .number()
    .positive({ message: "Valor inválido" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
  waist: z
    .number()
    .positive({ message: "Valor inválido" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
  hip: z
    .number()
    .positive({ message: "Valor inválido" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
  photo: z.array(z.string()).optional(),
});
