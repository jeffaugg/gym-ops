import { container, injectable } from "tsyringe";
import { TreinoDeAlunoService } from "../service/TreinoDeAlunoService";
import { Request, Response } from "express";
import { TreinoDeAlunoSchema } from "../dto/TreinoDeAlunoSchema";
import { paginationSchema } from "../../../shared/infra/zod/paginationSchema";

@injectable()
export class TreinoDeAlunoController {
  async create(req: Request, res: Response): Promise<Response> {
    const data = TreinoDeAlunoSchema.parse(req.body);
    const adm_id = req.user.adm_id;
    const treinoDeAlunoService = container.resolve(TreinoDeAlunoService);

    const treino_de_aluno = await treinoDeAlunoService.create(data, adm_id);

    return res.status(201).json(treino_de_aluno);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const treinoDeAlunoService = container.resolve(TreinoDeAlunoService);
    const adm_id = req.user.adm_id;
    const { page, limit } = paginationSchema.parse(req.query);

    const treinos_de_aluno = await treinoDeAlunoService.list(
      adm_id,
      page,
      limit,
    );
    return res.status(200).json(treinos_de_aluno);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const treinoDeAlunoService = container.resolve(TreinoDeAlunoService);

    await treinoDeAlunoService.delete(Number(id));
    return res.status(204).json();
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const treinoDeAlunoService = container.resolve(TreinoDeAlunoService);

    const treino_de_aluno = await treinoDeAlunoService.findById(Number(id));
    return res.status(200).json(treino_de_aluno);
  }

  async findByAlunoId(req: Request, res: Response): Promise<Response> {
    const { aluno_id } = req.params;
    const { page, limit } = paginationSchema.parse(req.query);
    const treinoDeAlunoService = container.resolve(TreinoDeAlunoService);

    const treinos_de_aluno = await treinoDeAlunoService.findByAlunoId(
      Number(aluno_id),
      page,
      limit,
    );
    return res.status(200).json(treinos_de_aluno);
  }
}
