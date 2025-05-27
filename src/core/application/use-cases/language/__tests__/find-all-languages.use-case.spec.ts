import { describe, it, expect, beforeEach } from 'vitest';
import { FindAllLanguagesUseCase } from '../find-all-languages.use-case';
import type { Language } from '@core/domain/entities/language.entity';
import type { LanguageRepository } from '@core/domain/repositories/language.repository';
import type { MockRepository } from '@core/domain/repositories/__tests__/mock-repository';

describe('FindAllLanguagesUseCase', () => {
  let useCase: FindAllLanguagesUseCase;
  let mockLanguageRepository: MockRepository<'findAll'>;

  beforeEach(() => {
    mockLanguageRepository = {
      findAll: vi.fn(),
    } as MockRepository<'findAll'>;

    useCase = new FindAllLanguagesUseCase(
      mockLanguageRepository as LanguageRepository,
    );
  });

  it('should return an array of languages', async () => {
    const expectedLanguages: Language[] = [
      {
        name: 'TypeScript',
        description: 'A typed superset of JavaScript',
        icon: 'typescript-icon.png',
      },
      {
        name: 'Python',
        description: 'A high-level programming language',
        icon: 'python-icon.png',
      },
    ] as Language[];

    mockLanguageRepository.findAll.mockResolvedValue(expectedLanguages);

    const result = await useCase.execute();

    expect(mockLanguageRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(expectedLanguages);
  });

  it('should return an empty array when no languages exist', async () => {
    mockLanguageRepository.findAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(mockLanguageRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
