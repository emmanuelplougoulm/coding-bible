import { Injectable, Inject } from '@nestjs/common';
import type { Language } from '@core/domain/entities/language.entity';
import type { LanguageRepository } from '@core/domain/repositories/language.repository';

@Injectable()
export class FindAllLanguagesUseCase {
  constructor(
    @Inject('LanguageRepository')
    private readonly languageRepository: LanguageRepository,
  ) {}

  async execute(): Promise<Language[]> {
    return this.languageRepository.findAll();
  }
}
