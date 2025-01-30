import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE pagamentos 
    ADD COLUMN user_id INTEGER NOT NULL,
    ADD CONSTRAINT fk_pagamentos_user FOREIGN KEY (user_id) REFERENCES users(id);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE pagamentos 
    DROP CONSTRAINT fk_pagamentos_user,
    DROP COLUMN user_id;
  `);
}
