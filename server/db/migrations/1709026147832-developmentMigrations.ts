import { MigrationInterface, QueryRunner } from "typeorm";

export class DevelopmentMigrations1709026147832 implements MigrationInterface {
    name = 'DevelopmentMigrations1709026147832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "layouts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "app_id" character varying NOT NULL, "top" double precision NOT NULL, "left" double precision NOT NULL, "width" double precision NOT NULL, "height" double precision NOT NULL, "component_id" uuid, CONSTRAINT "REL_ac2a629cebfc346a5bebb542cb" UNIQUE ("component_id"), CONSTRAINT "PK_f2331b0ed523c5c349652fffc7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "components" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "type" character varying NOT NULL, "app_id" character varying NOT NULL, "page_id" uuid NOT NULL, "parent" character varying, "properties" text, "styles" text NOT NULL, CONSTRAINT "PK_0d742661c63926321b5f5eac1ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "route" character varying NOT NULL, "app_id" character varying NOT NULL, "versionId" uuid, CONSTRAINT "PK_8f21ed625aa34c8391d636b7d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "versions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "app_id" character varying NOT NULL, "released" boolean NOT NULL DEFAULT false, "definition" text, "appId" uuid, CONSTRAINT "PK_921e9a820c96cc2cd7d4b3a107b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "apps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "release" character varying, "ownerId" uuid, CONSTRAINT "PK_c5121fda0f8268f1f7f84134e19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "apps_users_users" ("appsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_dd34eaaa1141fdc755edbcec588" PRIMARY KEY ("appsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_83185abf53724e379d66daa627" ON "apps_users_users" ("appsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_913c4e00943a753903a9631e93" ON "apps_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "layouts" ADD CONSTRAINT "FK_ac2a629cebfc346a5bebb542cb7" FOREIGN KEY ("component_id") REFERENCES "components"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "components" ADD CONSTRAINT "FK_de521ef5844106d2b2033dd2d8b" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "FK_1260dfe7c92c5925dd073224297" FOREIGN KEY ("versionId") REFERENCES "versions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "versions" ADD CONSTRAINT "FK_b9a4964cf142ed518cd967cd6a0" FOREIGN KEY ("appId") REFERENCES "apps"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apps" ADD CONSTRAINT "FK_fab1152a80b90058626ba4b5911" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apps_users_users" ADD CONSTRAINT "FK_83185abf53724e379d66daa6277" FOREIGN KEY ("appsId") REFERENCES "apps"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "apps_users_users" ADD CONSTRAINT "FK_913c4e00943a753903a9631e932" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apps_users_users" DROP CONSTRAINT "FK_913c4e00943a753903a9631e932"`);
        await queryRunner.query(`ALTER TABLE "apps_users_users" DROP CONSTRAINT "FK_83185abf53724e379d66daa6277"`);
        await queryRunner.query(`ALTER TABLE "apps" DROP CONSTRAINT "FK_fab1152a80b90058626ba4b5911"`);
        await queryRunner.query(`ALTER TABLE "versions" DROP CONSTRAINT "FK_b9a4964cf142ed518cd967cd6a0"`);
        await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "FK_1260dfe7c92c5925dd073224297"`);
        await queryRunner.query(`ALTER TABLE "components" DROP CONSTRAINT "FK_de521ef5844106d2b2033dd2d8b"`);
        await queryRunner.query(`ALTER TABLE "layouts" DROP CONSTRAINT "FK_ac2a629cebfc346a5bebb542cb7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_913c4e00943a753903a9631e93"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_83185abf53724e379d66daa627"`);
        await queryRunner.query(`DROP TABLE "apps_users_users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "apps"`);
        await queryRunner.query(`DROP TABLE "versions"`);
        await queryRunner.query(`DROP TABLE "pages"`);
        await queryRunner.query(`DROP TABLE "components"`);
        await queryRunner.query(`DROP TABLE "layouts"`);
    }

}
