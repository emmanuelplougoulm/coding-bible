import { Injectable, Inject } from '@nestjs/common';
import type { Language } from '@core/domain/entities/language.entity';
import type { LanguageRepository } from '@core/domain/repositories/language.repository';
import { LANGUAGE_REPOSITORY } from '@core/domain/repositories/language.repository';

@Injectable()
export class FindLanguageUseCase {
  constructor(
    @Inject(LANGUAGE_REPOSITORY)
    private readonly languageRepository: LanguageRepository,
  ) {}

  async execute(id: string): Promise<Language | null> {
    return this.languageRepository.findById(id);
  }
}
