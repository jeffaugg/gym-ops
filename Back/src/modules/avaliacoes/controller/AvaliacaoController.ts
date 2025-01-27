import { container, injectable } from "tsyringe";
import { AvaliacaoService } from "../service/AvaliacoesService";
import { AvaliacoesSchema } from "../dto/AvaliacaoSchema";
import { Request, Response } from "express";

@injectable()
export class AvaliacaoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const avaliacaoService = container.resolve(AvaliacaoService);
    const adm_id = req.user.adm_id;
    const id = req.user.id;

    const data = AvaliacoesSchema.parse(req.body);

    const avaliacao = await avaliacaoService.create({ id, ...data }, adm_id);

    return res.status(201).json(avaliacao);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const avaliacaoService = container.resolve(AvaliacaoService);
    const adm_id = req.user.adm_id;
    const avaliacoes = await avaliacaoService.list(adm_id);
    return res.status(200).json(avaliacoes);
  }

  public async findByAlunoId(req: Request, res: Response): Promise<Response> {
    const avaliacaoService = container.resolve(AvaliacaoService);
    const adm_id = req.user.adm_id;

    const { aluno_id } = req.params;

    const avaliacoes = await avaliacaoService.findByAlunoId(aluno_id, adm_id);

    return res.status(200).json(avaliacoes);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const avaliacaoService = container.resolve(AvaliacaoService);

    const { id } = req.params;

    const adm_id = req.user.adm_id;

    const data = AvaliacoesSchema.parse(req.body);

    const avaliacao = await avaliacaoService.update(id, data, adm_id);

    return res.status(200).json(avaliacao);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const avaliacaoService = container.resolve(AvaliacaoService);

    const { id } = req.params;

    const adm_id = req.user.adm_id;

    await avaliacaoService.delete(id, adm_id);

    return res.status(204).send();
  }
}
