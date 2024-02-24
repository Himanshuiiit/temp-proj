import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1708688024123 implements MigrationInterface {
    name = 'NewMigrations1708688024123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "components" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "components" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "components" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "components" ADD "createdAt" TIME NOT NULL DEFAULT now()`);
    }

}
