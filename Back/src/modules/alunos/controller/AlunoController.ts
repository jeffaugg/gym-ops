import { container, injectable } from "tsyringe";
import { AlunoService } from "../service/AlunoService";
import { Request, Response } from "express";
import { AlunoSchema } from "../dto/AlunoSchema";
import { z } from "zod";

@injectable()
export class AlunoController {
  async create(req: Request, res: Response): Promise<Response> {
    const data = AlunoSchema.parse(req.body);

    const adm_id = req.user.adm_id;

    const alunoService = container.resolve(AlunoService);

    const aluno = await alunoService.create(data, adm_id);

    return res.status(201).json(aluno);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const alunoService = container.resolve(AlunoService);
    const adm_id = req.user.adm_id;

    const alunos = await alunoService.list(adm_id);
    return res.status(200).json(alunos);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const adm_id = req.user.adm_id;
    const data = AlunoSchema.parse(req.body);

    const alunoService = container.resolve(AlunoService);

    const aluno = await alunoService.update(Number(id), adm_id, data);

    return res.status(200).json(aluno);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const adm_id = req.user.adm_id;

    const alunoService = container.resolve(AlunoService);

    await alunoService.delete(Number(id), adm_id);
    return res.status(204).json();
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const adm_id = req.user.adm_id;

    const alunoService = container.resolve(AlunoService);

    const aluno = await alunoService.findById(Number(id), adm_id);
    return res.status(200).json(aluno);
  }

  async findByCpf(req: Request, res: Response): Promise<Response> {
    const cpfSchema = z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: "CPF deve estar no formato XXX.XXX.XXX-XX",
    });
    const { cpf } = req.params;
    const adm_id = req.user.adm_id;
    cpfSchema.parse(cpf);

    const alunoService = container.resolve(AlunoService);

    const aluno = await alunoService.findByCpf(cpf, adm_id);
    return res.status(200).json(aluno);
  }

  async findByEmail(req: Request, res: Response): Promise<Response> {
    const emailSchema = z.string().email({ message: "Email inválido" });
    const { email } = req.params;
    const adm_id = req.user.adm_id;
    emailSchema.parse(email);

    const alunoService = container.resolve(AlunoService);

    const aluno = await alunoService.findByEmail(email, adm_id);
    return res.status(200).json(aluno);
  }
}
