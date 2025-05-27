import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LanguageController } from '../controllers/language.controller';
import { LanguageRepositoryImpl } from '../repositories/language.repository';
import { CreateLanguageUseCase } from '@core/application/use-cases/language/create-language.use-case';
import { FindLanguageUseCase } from '@core/application/use-cases/language/find-language.use-case';
import { FindAllLanguagesUseCase } from '@core/application/use-cases/language/find-all-languages.use-case';
import { UpdateLanguageUseCase } from '@core/application/use-cases/language/update-language.use-case';
import { DeleteLanguageUseCase } from '@core/application/use-cases/language/delete-language.use-case';
import {
  Language,
  LanguageSchema,
} from '@core/domain/entities/language.entity';
// import type { LanguageRepository } from "@core/domain/repositories/language.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Language.name, schema: LanguageSchema },
    ]),
  ],
  controllers: [LanguageController],
  providers: [
    {
      provide: 'LanguageRepository',
      useClass: LanguageRepositoryImpl,
    },
    CreateLanguageUseCase,
    FindLanguageUseCase,
    FindAllLanguagesUseCase,
    UpdateLanguageUseCase,
    DeleteLanguageUseCase,
  ],
  exports: ['LanguageRepository'],
})
export class LanguageModule {}
