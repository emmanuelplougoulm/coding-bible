import { Injectable, Inject } from '@nestjs/common';
import type { LanguageRepository } from '@core/domain/repositories/language.repository';

@Injectable()
export class DeleteLanguageUseCase {
  constructor(
    @Inject('LanguageRepository')
    private readonly languageRepository: LanguageRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.languageRepository.delete(id);
  }
}
