import { container } from "tsyringe";
import { AvaliacaoService } from "../service/AvaliacoesService";
import { AvaliacoesSchema } from "../dto/AvaliacaoSchema";
import { Request, Response } from "express";

export class AvaliacaoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const avaliacaoService = container.resolve(AvaliacaoService);

    const data = AvaliacoesSchema.parse(req.body);

    const avaliacao = await avaliacaoService.create(data);

    return res.status(201).json(avaliacao);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const avaliacaoService = container.resolve(AvaliacaoService);

    const avaliacoes = await avaliacaoService.list();
    return res.status(200).json(avaliacoes);
  }

  public async findByAlunoId(req: Request, res: Response): Promise<Response> {
    const avaliacaoService = container.resolve(AvaliacaoService);

    const { aluno_id } = req.params;

    const avaliacoes = await avaliacaoService.findByAlunoId(aluno_id);

    return res.status(200).json(avaliacoes);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const avaliacaoService = container.resolve(AvaliacaoService);

    const { id } = req.params;

    const data = AvaliacoesSchema.parse(req.body);

    const avaliacao = await avaliacaoService.update(id, data);

    return res.status(200).json(avaliacao);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const avaliacaoService = container.resolve(AvaliacaoService);

    const { id } = req.params;

    await avaliacaoService.delete(id);

    return res.status(204).send();
  }
}
