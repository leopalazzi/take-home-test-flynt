import {MigrationInterface, QueryRunner} from "typeorm";

export class recipeAddField1676383950306 implements MigrationInterface {
    name = 'recipeAddField1676383950306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe_ingredients_ingredient" ("recipeId" integer NOT NULL, "ingredientId" integer NOT NULL, CONSTRAINT "PK_6e193bb10a2cd8a65929edf7d07" PRIMARY KEY ("recipeId", "ingredientId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b67e81a9afa83f2ee13440175c" ON "recipe_ingredients_ingredient" ("recipeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2bbcf7bab477bfdcec65465c0" ON "recipe_ingredients_ingredient" ("ingredientId") `);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "timeToCook" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "numberOfPeople" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" ADD CONSTRAINT "FK_b67e81a9afa83f2ee13440175ce" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" ADD CONSTRAINT "FK_d2bbcf7bab477bfdcec65465c0c" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" DROP CONSTRAINT "FK_d2bbcf7bab477bfdcec65465c0c"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" DROP CONSTRAINT "FK_b67e81a9afa83f2ee13440175ce"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "numberOfPeople"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "timeToCook"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "price" integer NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d2bbcf7bab477bfdcec65465c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b67e81a9afa83f2ee13440175c"`);
        await queryRunner.query(`DROP TABLE "recipe_ingredients_ingredient"`);
    }

}
