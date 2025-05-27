import type { Language } from '@core/domain/entities/language.entity';
import type { LanguageRepository } from '@core/domain/repositories/language.repository';

export class FindAllLanguagesUseCase {
  constructor(private readonly languageRepository: LanguageRepository) {}

  async execute(): Promise<Language[]> {
    return this.languageRepository.findAll();
  }
}
