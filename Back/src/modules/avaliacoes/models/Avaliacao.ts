export class Avaliacao {
  id: number;
  aluno_id: number;
  instructor_id: number;
  date: Date;
  height: number;
  weight: number;
  fat_mass?: number;
  lean_mass?: number;
  left_arm_relaxed?: number;
  right_arm_relaxed?: number;
  left_arm_contracted?: number;
  right_arm_contracted?: number;
  left_thigh?: number;
  right_thigh?: number;
  left_calf?: number;
  right_calf?: number;
  chest?: number;
  abdomen?: number;
  photo?: string[];

  constructor(
    id: number,
    aluno_id: number,
    instructor_id: number,
    date: Date,
    height: number,
    weight: number,
    fat_mass?: number,
    lean_mass?: number,
    left_arm_relaxed?: number,
    right_arm_relaxed?: number,
    left_arm_contracted?: number,
    right_arm_contracted?: number,
    left_thigh?: number,
    right_thigh?: number,
    left_calf?: number,
    right_calf?: number,
    chest?: number,
    abdomen?: number,
    photo?: string[],
  ) {
    this.id = id;
    this.aluno_id = aluno_id;
    this.instructor_id = instructor_id;
    this.date = date;
    this.height = height;
    this.weight = weight;
    this.fat_mass = fat_mass;
    this.lean_mass = lean_mass;
    this.left_arm_relaxed = left_arm_relaxed;
    this.right_arm_relaxed = right_arm_relaxed;
    this.left_arm_contracted = left_arm_contracted;
    this.right_arm_contracted = right_arm_contracted;
    this.left_thigh = left_thigh;
    this.right_thigh = right_thigh;
    this.left_calf = left_calf;
    this.right_calf = right_calf;
    this.chest = chest;
    this.abdomen = abdomen;
    this.photo = photo;
  }

  static fromDatabase(data: any): Avaliacao {
    return new Avaliacao(
      data.id,
      data.aluno_id,
      data.instructor_id,
      data.date,
      data.height,
      data.weight,
      data.fat_mass,
      data.lean_mass,
      data.left_arm_relaxed,
      data.right_arm_relaxed,
      data.left_arm_contracted,
      data.right_arm_contracted,
      data.left_thigh,
      data.right_thigh,
      data.left_calf,
      data.right_calf,
      data.chest,
      data.abdomen,
      data.photo,
    );
  }
}
