import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        ALTER TABLE alunos
        ADD COLUMN status BOOLEAN DEFAULT true,
        ADD COLUMN gender VARCHAR(50)
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
        ALTER TABLE alunos
        DROP COLUMN status,
        DROP COLUMN gender
    `);
}
