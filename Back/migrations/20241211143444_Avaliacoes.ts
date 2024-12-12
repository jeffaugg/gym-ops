import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        CREATE TABLE avaliacoes (
        id SERIAL PRIMARY KEY,
        aluno_id INTEGER NOT NULL,
        instructor_id INTEGER NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        height FLOAT NOT NULL,
        weight FLOAT NOT NULL,
        fat_mass FLOAT NOT NULL,
        lean_mass FLOAT NOT NULL,
        left_arm_relaxed FLOAT,
        right_arm_relaxed FLOAT,
        left_arm_contracted FLOAT,
        right_arm_contracted FLOAT,
        left_thigh FLOAT,
        right_thigh FLOAT,
        left_calf FLOAT,
        right_calf FLOAT,
        chest FLOAT,
        abdomen FLOAT,
        waist FLOAT,
        hip FLOAT,
        FOREIGN KEY (aluno_id) REFERENCES alunos(id),
        FOREIGN KEY (instructor_id) REFERENCES users(id)
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS avaliacoes`);
}
