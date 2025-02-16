import "reflect-metadata";
import { container } from "tsyringe";

import { IUserRepository } from "../../modules/user/interface/IUserRepository";
import UserRepository from "../../modules/user/repositories/UserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

import { ITreinoDeAlunoRepository } from "../../modules/treinosDeAlunos/interface/ITreinoDeAlunoRepository";
import { TreinoDeAlunoRepository } from "../../modules/treinosDeAlunos/repository/TreinoDeAlunoRepository";

container.registerSingleton<ITreinoDeAlunoRepository>(
  "TreinoDeAlunoRepository",
  TreinoDeAlunoRepository,
);

import { TreinoRepository } from "../../modules/treinos/repository/TreinoRepository";
import { ITreinoRepository } from "../../modules/treinos/interface/ITreinoRepository";

container.registerSingleton<ITreinoRepository>(
  "TreinoRepository",
  TreinoRepository,
);

import { PresencaRepository } from "../../modules/presenca/repository/PresencaRepository";
import { IPresencaRepository } from "../../modules/presenca/interface/IPresencaRepository";

container.registerSingleton<IPresencaRepository>(
  "PresencaRepository",
  PresencaRepository,
);

import { PlanoRepository } from "../../modules/planos/repository/PlanoRepository";
import { IPlanoRepository } from "../../modules/planos/interface/IPlanoRepository";

container.registerSingleton<IPlanoRepository>(
  "PlanoRepository",
  PlanoRepository,
);

import { PagamentoRepository } from "../../modules/pagamentos/repository/PagamentoRepository";
import { IPagamentoRepository } from "../../modules/pagamentos/Interface/IPagamentoRepository";

container.registerSingleton<IPagamentoRepository>(
  "PagamentoRepository",
  PagamentoRepository,
);

import { MensagemRepository } from "../../modules/mensagens/repository/MensagemRepository";
import { IMensagemRepository } from "../../modules/mensagens/interface/IMensagemRepository";

container.registerSingleton<IMensagemRepository>(
  "MensagemRepository",
  MensagemRepository,
);

import { ExercicioDeTreinoRepository } from "../../modules/exerciciosDeTreinos/repository/ExercicioDeTreinoRepository";
import { IExercicioDeTreinoRepository } from "../../modules/exerciciosDeTreinos/interface/IExercicioDeTreinoRepository";

container.registerSingleton<IExercicioDeTreinoRepository>(
  "ExercicioDeTreinoRepository",
  ExercicioDeTreinoRepository,
);

import { ExercicioRepository } from "../../modules/exercicios/repository/ExercicioRepository";
import { IExercicioRepository } from "../../modules/exercicios/interface/IExercicioRepository";

container.registerSingleton<IExercicioRepository>(
  "ExercicioRepository",
  ExercicioRepository,
);

import { HorarioDeTurnoRepository } from "../../modules/cargoHoraria/repository/HorarioDeTurnoRepository";
import { IHorarioDeTurnoRepository } from "../../modules/cargoHoraria/interface/IHorarioDeTurnoRepository";

container.registerSingleton<IHorarioDeTurnoRepository>(
  "HorarioDeTurnoRepository",
  HorarioDeTurnoRepository,
);

import { DiaDaSemanaRepository } from "../../modules/cargoHoraria/repository/DiaDaSemanaRepository";
import { IDiaDaSemanaRepository } from "../../modules/cargoHoraria/interface/IDiaDaSemanaRepository";

container.registerSingleton<IDiaDaSemanaRepository>(
  "DiaDaSemanaRepository",
  DiaDaSemanaRepository,
);

import { CargoHorariaRepository } from "../../modules/cargoHoraria/repository/CargoHorariaRepository";
import { ICargoHorariaRepository } from "../../modules/cargoHoraria/interface/ICargoHorariaRepository";

container.registerSingleton<ICargoHorariaRepository>(
  "CargoHorariaRepository",
  CargoHorariaRepository,
);

import { FotosRepository } from "../../modules/avaliacoes/repository/FotosRepository";
import { IFotosRepository } from "../../modules/avaliacoes/interface/IFotosRepository ";

container.registerSingleton<IFotosRepository>(
  "FotosRepository",
  FotosRepository,
);

import { AvaliacoesRepository } from "../../modules/avaliacoes/repository/AvaliacoesRepository";
import { IAvaliacoesRepository } from "../../modules/avaliacoes/interface/IAvaliacoesRepository";

container.registerSingleton<IAvaliacoesRepository>(
  "AvaliacoesRepository",
  AvaliacoesRepository,
);

import { AlunoRepository } from "../../modules/alunos/repository/AlunoRepository";
import { IAlunoRepository } from "../../modules/alunos/Interface/IAlunoRepository";

container.registerSingleton<IAlunoRepository>(
  "AlunoRepository",
  AlunoRepository,
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

export { container };
