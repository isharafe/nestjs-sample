import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DataSource from "./datasource"
import { BaseRepository } from "./repository/base.repository"


@Module({
    imports: [
        TypeOrmModule.forRoot(DataSource.options)
    ],
    controllers: [],
    providers: [BaseRepository],
  })
  export class DatabaseModule {}
// This module sets up the database connection using TypeORM.
// It imports the DataSource configuration and registers it with TypeOrmModule.
// The BaseRepository is provided for use in other modules.