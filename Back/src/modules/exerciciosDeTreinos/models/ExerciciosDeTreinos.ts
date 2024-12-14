export class ExerciciosDeTreinos {
  treinoId: number;
  exercicioId: number;
  series: number;
  repeticoes: number;
  descanso_segundos: number;

  public constructor(
    treinoId: number,
    exercicioId: number,
    series: number,
    repeticoes: number,
    descanso_segundos: number
  ) {
    this.treinoId = treinoId;
    this.exercicioId = exercicioId;
    this.series = series;
    this.repeticoes = repeticoes;
    this.descanso_segundos = descanso_segundos;
  }

  static fromDatabase(data: any): ExerciciosDeTreinos {
    return new ExerciciosDeTreinos(
      data.treinoId,
      data.exercicioId,
      data.series,
      data.repeticoes,
      data.descanso_segundos
    );
  }
}