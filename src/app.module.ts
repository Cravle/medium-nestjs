import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './orm.config';
import { UserModule } from '@user/user.module';
import { AuthMiddlware } from '@user/middlwares/auth.middlware';
import { ArticleModule } from './article/article.module';
import { ProfileModule } from '@app/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TagModule,
    UserModule,
    ArticleModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddlware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
