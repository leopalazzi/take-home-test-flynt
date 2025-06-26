import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTagToIngredient1750942357465 implements MigrationInterface {
    name = 'AddTagToIngredient1750942357465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "tag" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "tag"`);
    }
}
