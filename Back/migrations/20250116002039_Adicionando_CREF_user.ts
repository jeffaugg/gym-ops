import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        ALTER TABLE users
        ADD COLUMN cref VARCHAR(20) UNIQUE;
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
            ALTER TABLE users
            DROP COLUMN cref;
        `);
}
