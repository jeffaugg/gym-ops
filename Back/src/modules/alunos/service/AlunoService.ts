import { inject, injectable } from "tsyringe";
import { AlunoRepository } from "../repository/AlunoRepository";
import { AlunoSchema } from "../dto/AlunoSchema";
import { z } from "zod";
import AppError from "../../../shared/errors/AppError";
import { PlanoRepository } from "../../planos/repository/PlanoRepository";
import UserRepository from "../../user/repositories/UserRepository";

@injectable()
export class AlunoService {
  constructor(
    @inject(AlunoRepository)
    private alunoRepository: AlunoRepository,
    @inject(PlanoRepository)
    private planoRepository: PlanoRepository,
    @inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(data: z.infer<typeof AlunoSchema>, adm_id: number) {
    const admById = await this.userRepository.findAdmById(adm_id);

    if (!admById || admById.role != "ADM") {
      throw new AppError("Administrador inválido", 404);
    }

    const userByEmail = await this.alunoRepository.findByEmail(
      data.email,
      adm_id,
    );

    if (userByEmail) {
      throw new AppError("Email já cadastrado", 409);
    }

    const userByCpf = await this.alunoRepository.findByCpf(data.cpf, adm_id);

    if (userByCpf) {
      throw new AppError("CPF já cadastrado", 409);
    }

    const plano = await this.planoRepository.findById(data.plan_id, adm_id);

    if (!plano) {
      throw new AppError("Plano não encontrado", 404);
    }

    if (!data.health_notes || data.health_notes.length < 1) {
      data.health_notes = null;
    }

    const alunoData = { ...data, adm_id };

    return await this.alunoRepository.create(alunoData);
  }

  async list(adm_id: number) {
    return this.alunoRepository.list(adm_id);
  }

  async update(id: number, adm_id: number, data: z.infer<typeof AlunoSchema>) {
    const user = await this.alunoRepository.findById(id, adm_id);

    if (!user) {
      throw new AppError("Aluno não encontrado", 404);
    }

    const plano = await this.planoRepository.findById(data.plan_id, adm_id);

    const userByCpf = await this.alunoRepository.findByCpf(data.cpf, adm_id);
    if (user.cpf != data.cpf && userByCpf) {
      throw new AppError("CPF já cadastrado", 409);
    }

    const userByEmail = await this.alunoRepository.findByEmail(
      data.email,
      adm_id,
    );

    if (user.email != data.email && userByEmail) {
      throw new AppError("Email já cadastrado", 409);
    }

    if (!plano) {
      throw new AppError("Plano não encontrado", 404);
    }

    return await this.alunoRepository.update(id, adm_id, data);
  }

  async findById(id: number, adm_id: number) {
    const user = await this.alunoRepository.findById(id, adm_id);

    if (!user) {
      throw new AppError("Aluno não encontrado", 404);
    }

    return user;
  }

  async delete(id: number, adm_id: number) {
    const user = await this.alunoRepository.findById(id, adm_id);

    if (!user) {
      throw new AppError("Aluno não encontrado", 404);
    }

    return await this.alunoRepository.delete(id, adm_id);
  }

  async findByCpf(cpf: string, adm_id: number) {
    const user = await this.alunoRepository.findByCpf(cpf, adm_id);

    if (!user) {
      throw new AppError("Aluno não encontrado", 404);
    }

    return user;
  }

  async findByEmail(email: string, adm_id: number) {
    const user = await this.alunoRepository.findByEmail(email, adm_id);

    if (!user) {
      throw new AppError("Aluno não encontrado", 404);
    }

    return user;
  }
}
