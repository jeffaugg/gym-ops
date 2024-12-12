import { container, injectable } from "tsyringe";
import { AlunoService } from "../service/AlunoService";
import { Request, Response } from "express";
import { AlunoSchema } from "../dto/AlunoSchema";
import { z } from "zod";

@injectable()
export class AlunoController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, date_of_birth, cpf, telephone, plan_id } =
      AlunoSchema.parse(req.body);

    const alunoService = container.resolve(AlunoService);

    const aluno = await alunoService.create({
      name,
      email,
      date_of_birth,
      cpf,
      telephone,
      plan_id,
    });

    return res.status(201).json(aluno);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const alunoService = container.resolve(AlunoService);

    const alunos = await alunoService.list();
    return res.status(200).json(alunos);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, date_of_birth, cpf, telephone, plan_id } =
      AlunoSchema.parse(req.body);

    const alunoService = container.resolve(AlunoService);

    const aluno = await alunoService.update(Number(id), {
      name,
      email,
      date_of_birth,
      cpf,
      telephone,
      plan_id,
    });

    return res.status(200).json(aluno);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const alunoService = container.resolve(AlunoService);

    await alunoService.delete(Number(id));
    return res.status(204).json();
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const alunoService = container.resolve(AlunoService);

    const aluno = await alunoService.findById(Number(id));
    return res.status(200).json(aluno);
  }

  async findByCpf(req: Request, res: Response): Promise<Response> {
    const cpfSchema = z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: "CPF deve estar no formato XXX.XXX.XXX-XX",
    });
    const { cpf } = req.params;
    cpfSchema.parse(cpf);

    const alunoService = container.resolve(AlunoService);

    const aluno = await alunoService.findByCpf(cpf);
    return res.status(200).json(aluno);
  }

  async findByEmail(req: Request, res: Response): Promise<Response> {
    const emailSchema = z.string().email({ message: "Email inválido" });
    const { email } = req.params;
    emailSchema.parse(email);

    const alunoService = container.resolve(AlunoService);

    const aluno = await alunoService.findByEmail(email);
    return res.status(200).json(aluno);
  }
}
