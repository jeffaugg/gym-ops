import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE dias(
       id SERIAL PRIMARY KEY,
       day_week VARCHAR(20) NOT NULL UNIQUE CHECK(
            day_week IN ('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo')
       )
    )
  `);

  await knex.raw(`
    CREATE TABLE horarios(
      id SERIAL PRIMARY KEY,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL
    )
  `);

  await knex.raw(`
    CREATE TABLE cargo_horaria(
      id SERIAL PRIMARY KEY,
      dia_id INT NOT NULL,
      horario_id INT NOT NULL,
      FOREIGN KEY (dia_id) REFERENCES dias(id),
      FOREIGN KEY (horario_id) REFERENCES horarios(id)
    )
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS cargo_horaria`);
  await knex.raw(`DROP TABLE IF EXISTS dias`);
  await knex.raw(`DROP TABLE IF EXISTS horarios`);
}
