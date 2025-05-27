import { describe, it, expect, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { FindLanguageUseCase } from '../find-language.use-case';
import type { Language } from '@core/domain/entities/language.entity';

describe('FindLanguageUseCase', () => {
  let useCase: FindLanguageUseCase;
  let mockLanguageRepository: {
    findById: Mock;
  };

  beforeEach(() => {
    mockLanguageRepository = {
      findById: vi.fn(),
    };

    useCase = new FindLanguageUseCase(mockLanguageRepository as any);
  });

  it('should find a language by id', async () => {
    const languageId = '123';
    const expectedLanguage: Language = {
      id: languageId,
      name: 'TypeScript',
      description: 'A typed superset of JavaScript',
      icon: 'typescript-icon.png',
    } as Language;

    mockLanguageRepository.findById.mockResolvedValue(expectedLanguage);

    const result = await useCase.execute(languageId);

    expect(mockLanguageRepository.findById).toHaveBeenCalledWith(languageId);
    expect(result).toEqual(expectedLanguage);
  });

  it('should return null when language is not found', async () => {
    const languageId = 'non-existent-id';

    mockLanguageRepository.findById.mockResolvedValue(null);

    const result = await useCase.execute(languageId);

    expect(mockLanguageRepository.findById).toHaveBeenCalledWith(languageId);
    expect(result).toBeNull();
  });
});
