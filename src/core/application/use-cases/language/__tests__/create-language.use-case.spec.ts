import { describe, it, expect, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { CreateLanguageUseCase } from '../create-language.use-case';
import type { Language } from '@core/domain/entities/language.entity';
import type { CreateLanguageDto } from '@core/application/dtos/language.dto';

describe('CreateLanguageUseCase', () => {
  let useCase: CreateLanguageUseCase;
  let mockLanguageRepository: {
    create: Mock;
  };

  beforeEach(() => {
    mockLanguageRepository = {
      create: vi.fn(),
    };

    useCase = new CreateLanguageUseCase(mockLanguageRepository as any);
  });

  it('should create a new language', async () => {
    const dto: CreateLanguageDto = {
      name: 'TypeScript',
      description: 'A typed superset of JavaScript',
      icon: 'typescript-icon.png',
    };

    const expectedLanguage: Language = {
      name: dto.name,
      description: dto.description,
      icon: dto.icon,
    } as Language;

    mockLanguageRepository.create.mockResolvedValue(expectedLanguage);

    const result = await useCase.execute(dto);

    expect(mockLanguageRepository.create).toHaveBeenCalledWith({
      name: dto.name,
      description: dto.description,
      icon: dto.icon,
    });
    expect(result).toEqual(expectedLanguage);
  });

  it('should create a language without optional icon', async () => {
    const dto: CreateLanguageDto = {
      name: 'TypeScript',
      description: 'A typed superset of JavaScript',
    };

    const expectedLanguage: Language = {
      name: dto.name,
      description: dto.description,
    } as Language;

    mockLanguageRepository.create.mockResolvedValue(expectedLanguage);

    const result = await useCase.execute(dto);

    expect(mockLanguageRepository.create).toHaveBeenCalledWith({
      name: dto.name,
      description: dto.description,
      icon: undefined,
    });
    expect(result).toEqual(expectedLanguage);
  });
});
