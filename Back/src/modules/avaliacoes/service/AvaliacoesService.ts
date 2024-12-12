import { z } from "zod";
import { AvaliacoesSchema } from "../dto/AvaliacaoSchema";
import { inject, injectable } from "tsyringe";
import { AvaliacoesRepository } from "../repository/AvaliacoesRepository";
import { Avaliacao } from "../models/Avaliacao";
import { FotosRepository } from "../repository/FotosRepository";

@injectable()
export class AvaliacaoService {
  constructor(
    @inject(AvaliacoesRepository)
    private avaliacoesRepository: AvaliacoesRepository,
    @inject(FotosRepository)
    private fotosRepository: FotosRepository,
  ) {}
  async create(data: z.infer<typeof AvaliacoesSchema>): Promise<Avaliacao> {
    const avaliacao = await this.avaliacoesRepository.create(data);

    for (const foto of data.photo) {
      await this.fotosRepository.create(foto, avaliacao.id);
    }

    return avaliacao;
  }
}
