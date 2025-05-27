import { describe, it, expect, beforeEach } from 'vitest';
import { UpdateLanguageUseCase } from '../update-language.use-case';
import type { Language } from '@core/domain/entities/language.entity';
import type { UpdateLanguageDto } from '@core/application/dtos/language.dto';
import type { LanguageRepository } from '@core/domain/repositories/language.repository';
import type { MockRepository } from '@core/domain/repositories/__tests__/mock-repository';

describe('UpdateLanguageUseCase', () => {
  let useCase: UpdateLanguageUseCase;
  let mockLanguageRepository: MockRepository<'update'>;

  beforeEach(() => {
    mockLanguageRepository = {
      update: vi.fn(),
    } as MockRepository<'update'>;

    useCase = new UpdateLanguageUseCase(
      mockLanguageRepository as LanguageRepository,
    );
  });

  it('should update a language with all properties', async () => {
    const languageId = '123';
    const dto: UpdateLanguageDto = {
      name: 'TypeScript Updated',
      description: 'Updated description',
      icon: 'new-icon.png',
    };

    const expectedLanguage: Language = {
      name: dto.name,
      description: dto.description,
      icon: dto.icon,
    } as Language;

    mockLanguageRepository.update.mockResolvedValue(expectedLanguage);

    const result = await useCase.execute(languageId, dto);

    expect(mockLanguageRepository.update).toHaveBeenCalledWith(languageId, {
      name: dto.name,
      description: dto.description,
      icon: dto.icon,
    });
    expect(result).toEqual(expectedLanguage);
  });

  it('should update a language with partial properties', async () => {
    const languageId = '123';
    const dto: UpdateLanguageDto = {
      name: 'TypeScript Updated',
    };

    const expectedLanguage: Language = {
      name: dto.name,
      description: 'Original description',
      icon: 'original-icon.png',
    } as Language;

    mockLanguageRepository.update.mockResolvedValue(expectedLanguage);

    const result = await useCase.execute(languageId, dto);

    expect(mockLanguageRepository.update).toHaveBeenCalledWith(languageId, {
      name: dto.name,
      description: undefined,
      icon: undefined,
    });
    expect(result).toEqual(expectedLanguage);
  });
});
