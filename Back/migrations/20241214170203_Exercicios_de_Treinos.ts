import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        CREATE TABLE exercicios_de_treinos (
            id SERIAL PRIMARY KEY,
            treino_id INTEGER NOT NULL,
            exercicio_id INTEGER NOT NULL,
            repeticoes INTEGER NOT NULL,
            series INTEGER NOT NULL,
            descanso_segundos INTEGER NOT NULL,
            FOREIGN KEY (treino_id) REFERENCES treinos(id) ON DELETE CASCADE,
            FOREIGN KEY (exercicio_id) REFERENCES treinos(id) ON DELETE CASCADE
        )
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS exercicios_de_treinos`);
}
