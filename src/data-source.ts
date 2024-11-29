import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "bd",
  port: 5432,
  username: "user",
  password: "password",
  database: "gym-ops",
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});
