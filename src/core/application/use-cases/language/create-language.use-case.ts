import { Injectable, Inject } from '@nestjs/common';
import type { Language } from '@core/domain/entities/language.entity';
import type { LanguageRepository } from '@core/domain/repositories/language.repository';
import type { CreateLanguageDto } from '@core/application/dtos/language.dto';
import { LANGUAGE_REPOSITORY } from '@core/domain/repositories/language.repository';

@Injectable()
export class CreateLanguageUseCase {
  constructor(
    @Inject(LANGUAGE_REPOSITORY)
    private readonly languageRepository: LanguageRepository,
  ) {}

  async execute(dto: CreateLanguageDto): Promise<Language> {
    return this.languageRepository.create({
      name: dto.name,
      description: dto.description,
      icon: dto.icon,
    });
  }
}
