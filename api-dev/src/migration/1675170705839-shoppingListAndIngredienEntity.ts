import {MigrationInterface, QueryRunner} from "typeorm";

export class shoppingListAndIngredienEntity1675170705839 implements MigrationInterface {
    name = 'shoppingListAndIngredienEntity1675170705839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopping_list" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_87d9431f2ea573a79370742b474" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shopping_list"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
    }

}
