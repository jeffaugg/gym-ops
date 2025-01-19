import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE users
    ADD COLUMN gender VARCHAR(1) DEFAULT 'O' CHECK (gender IN ('M', 'F', 'O')),
    ADD COLUMN date_of_birth DATE;
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE users
    DROP COLUMN gender,
    DROP COLUMN date_of_birth;
  `);
}
