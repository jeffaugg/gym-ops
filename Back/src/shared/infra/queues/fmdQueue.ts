import Queue from "bull";
import redisConnection from "../http/config/redis";
import dotenv from "dotenv";
import { checkMatch } from "../readerApi/compareFMDService";
import AppError from "../../errors/AppError";
import { presencaRegistrada } from "../../../modules/alunos/service/DigitalService";
import { container } from "tsyringe";
import { AlunoService } from "../../../modules/alunos/service/AlunoService";
import { PresencaService } from "../../../modules/presenca/service/PresencaService";
dotenv.config();

const fmdQueue = new Queue("fmdQueue", {
  redis: {
    host: redisConnection.options.host as string,
    port: redisConnection.options.port as number,
  },
});

fmdQueue.process(async (job) => {
  try {
    const {
      dataFmd,
      compareFmd,
      user_id,
      adm_id,
    }: {
      dataFmd: Buffer;
      compareFmd: Buffer;
      user_id: number;
      adm_id: number;
    } = job.data;

    const response = checkMatch(dataFmd, compareFmd);
    if (response) {
      const alunoService = container.resolve(AlunoService);
      const aluno = await alunoService.findById(user_id, adm_id);

      const presencaService = container.resolve(PresencaService);

      await presencaService.create(aluno.id, aluno.adm_id);
      presencaRegistrada(user_id);
      return fmdQueue.empty();
    }
  } catch (e) {
    throw new AppError(`Erro no processamendo de digital: ${e}`, 500);
  }
});

export default fmdQueue;
