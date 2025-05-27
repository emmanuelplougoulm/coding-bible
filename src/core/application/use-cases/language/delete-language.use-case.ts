import type { LanguageRepository } from '@core/domain/repositories/language.repository';

export class DeleteLanguageUseCase {
  constructor(private readonly languageRepository: LanguageRepository) {}

  async execute(id: string): Promise<void> {
    await this.languageRepository.delete(id);
  }
}
