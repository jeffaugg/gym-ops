import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        CREATE TABLE mensagens (
            id SERIAL PRIMARY KEY,
            id_adm INTEGER NOT NULL,
            title VARCHAR(255) NOT NULL,
            body TEXT NOT NULL,
            recipient_type VARCHAR(20) NOT NULL CHECK (recipient_type IN ('STUDENTS', 'INSTRUCTORS', 'ALL')),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_adm) REFERENCES users(id) ON DELETE CASCADE
        )
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS mensagens`);
}
