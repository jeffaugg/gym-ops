import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE cargo_horaria
    DROP CONSTRAINT IF EXISTS cargo_horaria_user_id_key;
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE cargo_horaria
    ADD CONSTRAINT cargo_horaria_user_id_key UNIQUE (user_id);
  `);
}
