import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        CREATE TABLE treinos_de_alunos (
            id SERIAL PRIMARY KEY,
            aluno_id INTEGER NOT NULL,
            treino_id INTEGER NOT NULL,
            FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
            FOREIGN KEY (treino_id) REFERENCES treinos(id) ON DELETE CASCADE
        )
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS treinos_de_alunos`);
}
