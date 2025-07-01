import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1751291054832 implements MigrationInterface {
    name = 'Init1751291054832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`shorten\` (\`id\` int NOT NULL AUTO_INCREMENT, \`originalUrl\` varchar(32) NOT NULL, \`shortUrl\` varchar(8) NOT NULL, \`alias\` varchar(20) NULL, \`createdAt\` datetime NOT NULL, \`expiresAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`clickedAt\` datetime NOT NULL, \`ip\` varchar(15) NOT NULL, \`shortenId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`history\` ADD CONSTRAINT \`FK_c387f9d5ec4a6c391719044d98f\` FOREIGN KEY (\`shortenId\`) REFERENCES \`shorten\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`history\` DROP FOREIGN KEY \`FK_c387f9d5ec4a6c391719044d98f\``);
        await queryRunner.query(`DROP TABLE \`history\``);
        await queryRunner.query(`DROP TABLE \`shorten\``);
    }

}
