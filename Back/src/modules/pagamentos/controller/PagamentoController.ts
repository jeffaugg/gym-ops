import { Request, Response } from "express";
import { PagamentoService } from "../service/PagamentoService";
import { container } from "tsyringe";
import { PagamentoSchema } from "../dto/PagamentoSchema";
import { paginationSchema } from "../../../shared/infra/zod/paginationSchema";

export class PagamentoController {
  async create(req: Request, res: Response) {
    const data = PagamentoSchema.parse(req.body);
    const { id: user_id, adm_id } = req.user;

    const pagamentoService = container.resolve(PagamentoService);

    const pagamento = await pagamentoService.create(data, adm_id, user_id);

    return res.status(201).json(pagamento);
  }

  async list(req: Request, res: Response) {
    const pagamentoService = container.resolve(PagamentoService);
    const adm_id = req.user.adm_id;
    const { page, limit } = paginationSchema.parse(req.query);

    const pagamentos = await pagamentoService.list(adm_id, page, limit);

    return res.json(pagamentos);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const pagamentoService = container.resolve(PagamentoService);

    const pagamento = await pagamentoService.findById(Number(id));

    return res.json(pagamento);
  }

  async findByAlunoId(req: Request, res: Response) {
    const { id } = req.params;
    const { page, limit } = paginationSchema.parse(req.query);
    const pagamentoService = container.resolve(PagamentoService);

    const pagamentos = await pagamentoService.findByAlunoId(
      Number(id),
      page,
      limit,
    );

    return res.json(pagamentos);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const pagamentoService = container.resolve(PagamentoService);

    await pagamentoService.delete(Number(id));

    return res.status(204).send();
  }
}
