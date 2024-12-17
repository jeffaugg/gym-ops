import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        CREATE TABLE fotos_avaliacoes (
        id SERIAL PRIMARY KEY,
        avaliacao_id INTEGER NOT NULL,
        foto_path TEXT NOT NULL,
        data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (avaliacao_id) REFERENCES avaliacoes(id) ON DELETE CASCADE
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS fotos_avaliacoes`);
}
