export class ExerciciosDeTreinos {
  id: number;
  treino_id: number;
  exercicio_id: number;
  series: number;
  repeticoes: number;
  descanso_segundos: number;

  public constructor(
    id: number,
    treino_id: number,
    exercicio_id: number,
    series: number,
    repeticoes: number,
    descanso_segundos: number
  ) {
    this.id = id;
    this.treino_id = treino_id;
    this.exercicio_id = exercicio_id;
    this.series = series;
    this.repeticoes = repeticoes;
    this.descanso_segundos = descanso_segundos;
  }

  static fromDatabase(data: any): ExerciciosDeTreinos {
    return new ExerciciosDeTreinos(
      data.id,
      data.treino_id,
      data.exercicio_id,
      data.series,
      data.repeticoes,
      data.descanso_segundos
    );
  }
}