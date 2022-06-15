import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsers1652804414759 implements MigrationInterface {
    name = 'CreateUsers1652804414759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET DEFAULT ''`);
    }

}
