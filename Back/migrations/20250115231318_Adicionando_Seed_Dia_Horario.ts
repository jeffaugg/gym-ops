import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        INSERT INTO dias(day_week) 
        VALUES 
            ('Domingo'),
            ('Segunda'),
            ('Terça'),
            ('Quarta'),
            ('Quinta'),
            ('Sexta'),
            ('Sábado');
  `);

  await knex.raw(`
        INSERT INTO horarios(start_time, end_time) 
        VALUES 
            ('08:00:00', '12:00:00'),
            ('13:00:00', '17:00:00'),
            ('18:00:00', '22:00:00');
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DELETE FROM dias`);
  await knex.raw(`DELETE FROM horarios`);
}
