import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "src/database/database.module";
import { TestService } from "./service/test.service";
import { TestController } from "./controller/test.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TestModel } from "./model/test.model";

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        TypeOrmModule.forFeature([TestModel]),
    ],
    controllers: [
        TestController,
    ],
    providers: [
        TestService,
    ],
})
export class TestModule { }
