import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE alunos
    ADD COLUMN health_notes VARCHAR(500);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE alunos
    DROP COLUMN health_notes;
  `);
}
