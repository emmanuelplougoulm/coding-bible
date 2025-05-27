import { Injectable, Inject } from '@nestjs/common';
import type { Language } from '@core/domain/entities/language.entity';
import type { LanguageRepository } from '@core/domain/repositories/language.repository';
import type { UpdateLanguageDto } from '@core/application/dtos/language.dto';

@Injectable()
export class UpdateLanguageUseCase {
  constructor(
    @Inject('LanguageRepository')
    private readonly languageRepository: LanguageRepository,
  ) {}

  async execute(id: string, dto: UpdateLanguageDto): Promise<Language> {
    return this.languageRepository.update(id, {
      name: dto.name,
      description: dto.description,
      icon: dto.icon,
    });
  }
}
