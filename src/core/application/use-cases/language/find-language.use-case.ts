import type { Language } from '@core/domain/entities/language.entity';
import type { LanguageRepository } from '@core/domain/repositories/language.repository';

export class FindLanguageUseCase {
  constructor(private readonly languageRepository: LanguageRepository) {}

  async execute(id: string): Promise<Language | null> {
    return this.languageRepository.findById(id);
  }
}
