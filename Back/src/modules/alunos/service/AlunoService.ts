import { inject, injectable } from "tsyringe";
import { AlunoRepository } from "../repository/AlunoRepository";
import { AlunoSchema } from "../dto/AlunoSchema";
import { z } from "zod";
import AppError from "../../../shared/errors/AppError";
import { PlanoRepository } from "../../planos/repository/PlanoRepository";

@injectable()
export class AlunoService {
  constructor(
    @inject(AlunoRepository)
    private alunoRepository: AlunoRepository,
    @inject(PlanoRepository)
    private planoRepository: PlanoRepository,
  ) {}

  async create(data: z.infer<typeof AlunoSchema>) {
    const userByEmail = await this.alunoRepository.findByEmail(data.email);

    if (userByEmail) {
      throw new AppError("Email já cadastrado", 409);
    }

    const userByCpf = await this.alunoRepository.findByCpf(data.cpf);

    if (userByCpf) {
      throw new AppError("CPF já cadastrado", 409);
    }

    const plano = await this.planoRepository.findById(data.plan_id);

    if (!plano) {
      throw new AppError("Plano não encontrado", 404);
    }

    if (!data.health_notes || data.health_notes.length < 1) {
      data.health_notes = null;
    }

    return await this.alunoRepository.create(data);
  }

  async list() {
    return this.alunoRepository.list();
  }

  async update(id: number, data: z.infer<typeof AlunoSchema>) {
    const user = await this.alunoRepository.findById(id);

    if (!user) {
      throw new AppError("Aluno não encontrado", 404);
    }

    const plano = await this.planoRepository.findById(data.plan_id);

    const userByCpf = await this.alunoRepository.findByCpf(data.cpf);
    if (user.cpf != data.cpf && userByCpf) {
      throw new AppError("CPF já cadastrado", 409);
    }

    const userByEmail = await this.alunoRepository.findByEmail(data.email);

    if (user.email != data.email && userByEmail) {
      throw new AppError("Email já cadastrado", 409);
    }

    if (!plano) {
      throw new AppError("Plano não encontrado", 404);
    }

    return await this.alunoRepository.update(id, data);
  }

  async findById(id: number) {
    const user = await this.alunoRepository.findById(id);

    if (!user) {
      throw new AppError("Aluno não encontrado", 404);
    }

    return user;
  }

  async delete(id: number) {
    const user = await this.alunoRepository.findById(id);

    if (!user) {
      throw new AppError("Aluno não encontrado", 404);
    }

    return await this.alunoRepository.delete(id);
  }

  async findByCpf(cpf: string) {
    const user = await this.alunoRepository.findByCpf(cpf);

    if (!user) {
      throw new AppError("Aluno não encontrado", 404);
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.alunoRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Aluno não encontrado", 404);
    }

    return user;
  }
}
