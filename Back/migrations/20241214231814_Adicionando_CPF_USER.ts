import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE users
    ADD COLUMN cpf VARCHAR(14) UNIQUE;
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE users
    DROP COLUMN IF EXISTS cpf;
  `);
}
