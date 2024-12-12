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
}
