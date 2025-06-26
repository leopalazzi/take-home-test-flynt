import {MigrationInterface, QueryRunner} from "typeorm";

export class shoppingListWithRecipes1677594666728 implements MigrationInterface {
    name = 'shoppingListWithRecipes1677594666728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shopping_list_recipes_recipe" ("shoppingListId" integer NOT NULL, "recipeId" integer NOT NULL, CONSTRAINT "PK_474c7a5ebdc1649bc134da8375e" PRIMARY KEY ("shoppingListId", "recipeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c921ff4c791e8feba8c8d68af7" ON "shopping_list_recipes_recipe" ("shoppingListId") `);
        await queryRunner.query(`CREATE INDEX "IDX_993bbe0210a2cda38d5c187702" ON "shopping_list_recipes_recipe" ("recipeId") `);
        await queryRunner.query(`ALTER TABLE "shopping_list_recipes_recipe" ADD CONSTRAINT "FK_c921ff4c791e8feba8c8d68af7a" FOREIGN KEY ("shoppingListId") REFERENCES "shopping_list"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shopping_list_recipes_recipe" ADD CONSTRAINT "FK_993bbe0210a2cda38d5c187702f" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_list_recipes_recipe" DROP CONSTRAINT "FK_993bbe0210a2cda38d5c187702f"`);
        await queryRunner.query(`ALTER TABLE "shopping_list_recipes_recipe" DROP CONSTRAINT "FK_c921ff4c791e8feba8c8d68af7a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_993bbe0210a2cda38d5c187702"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c921ff4c791e8feba8c8d68af7"`);
        await queryRunner.query(`DROP TABLE "shopping_list_recipes_recipe"`);
    }

}
