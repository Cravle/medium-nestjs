import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1652797646260 implements MigrationInterface {
  name = 'SeedDb1652797646260';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );

    //password is foo
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', '$2b$10$z94Qn/hxj8sqs0vLiqYabu2G.ExYIDhrF1lrOMUKrut7DKlcoKyoe' )`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'first article description', 'first article body', 'coffee,dragons', 1)`,
    );
    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second article', 'second article description', 'second article body', 'coffee,dragons', 1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
