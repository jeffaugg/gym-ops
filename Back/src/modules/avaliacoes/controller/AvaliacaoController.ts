import { container } from "tsyringe";
import { AvaliacaoService } from "../service/AvaliacoesService";
import { AvaliacoesSchema } from "../dto/AvaliacaoSchema";
import { Request, Response } from "express";

export class AvaliacaoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const avaliacaoService = container.resolve(AvaliacaoService);

    const {
      aluno_id,
      instructor_id,
      height,
      weight,
      fat_mass,
      lean_mass,
      left_arm_relaxed,
      right_arm_relaxed,
      left_arm_contracted,
      right_arm_contracted,
      left_thigh,
      right_thigh,
      left_calf,
      right_calf,
      chest,
      abdomen,
      photo,
    } = AvaliacoesSchema.parse(req.body);

    const avaliacao = await avaliacaoService.create({
      aluno_id,
      instructor_id,
      height,
      weight,
      fat_mass,
      lean_mass,
      left_arm_relaxed,
      right_arm_relaxed,
      left_arm_contracted,
      right_arm_contracted,
      left_thigh,
      right_thigh,
      left_calf,
      right_calf,
      chest,
      abdomen,
      photo,
    });

    return res.status(201).json(avaliacao);
  }
}
