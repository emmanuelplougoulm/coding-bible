import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from '@config/database.config';
import { LanguageModule } from './infrastructure/modules/language.module';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri, databaseConfig.options),
    LanguageModule,
  ],
})
export class AppModule {}
