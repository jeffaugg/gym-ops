import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    `CREATE TABLE presenca (
            id SERIAL PRIMARY KEY,
            aluno_id INTEGER NOT NULL,
            data DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (aluno_id) REFERENCES alunos(id)
  );`,
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS presenca`);
}
