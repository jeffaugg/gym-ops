import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        ALTER TABLE cargo_horaria
        ADD COLUMN user_id INT NOT NULL UNIQUE,
        ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE;`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
        ALTER TABLE cargo_horaria
        DROP CONSTRAINT fk_user_id,
        DROP COLUMN user_id;`);
}
