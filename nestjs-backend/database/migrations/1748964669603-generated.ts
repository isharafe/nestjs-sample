import { User } from "src/authentication/model/user.model";
import { MigrationInterface, QueryRunner } from "typeorm";
import * as crypto from 'crypto';

export class Generated1748964669603 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const passHash = crypto.createHash('sha1').update("test").digest('hex');
        await queryRunner.manager.save(User, [
            { username: "test", password: passHash, type: "admin", row_version: new Date(), active: true },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.delete(User, [
            { username: "test" },
        ]);
    }

}
