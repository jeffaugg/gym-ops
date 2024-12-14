export class ExerciciosDeTreinos {
  id: number;
  treinoId: number;
  exercicioId: number;
  series: number;
  repeticoes: number;
  descanso_segundos: number;

  public constructor(
    id: number,
    treinoId: number,
    exercicioId: number,
    series: number,
    repeticoes: number,
    descanso_segundos: number
  ) {
    this.id = id;
    this.treinoId = treinoId;
    this.exercicioId = exercicioId;
    this.series = series;
    this.repeticoes = repeticoes;
    this.descanso_segundos = descanso_segundos;
  }

  static fromDatabase(data: any): ExerciciosDeTreinos {
    return new ExerciciosDeTreinos(
      data.id,
      data.treinoId,
      data.exercicioId,
      data.series,
      data.repeticoes,
      data.descanso_segundos
    );
  }
}