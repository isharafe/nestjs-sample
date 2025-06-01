import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import DBConstants from "./database.constant";
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
    type: "mysql",
    host: configService.get(DBConstants.DATABASE_HOST),
    port: configService.get(DBConstants.DATABASE_PORT),
    username: configService.get(DBConstants.DATABASE_USER),
    password: configService.get(DBConstants.DATABASE_PASSWORD),
    database: configService.get(DBConstants.DATABASE_NAME),
    entities: [`${__dirname}/../**/*.model{.ts,.js}`],
    synchronize: false,
    logging: true,
    migrations: [`${__dirname}/../../database/migrations/*.ts`],
    migrationsTableName: 'migrations',
  });
// This file sets up the TypeORM DataSource for the application.
// It uses environment variables to configure the database connection.