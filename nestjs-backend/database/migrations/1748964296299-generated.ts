import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1748964296299 implements MigrationInterface {
    name = 'Generated1748964296299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`type\` varchar(255) NULL, \`user\` varchar(50) NULL, \`row_version\` timestamp NULL, \`active\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`username\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
