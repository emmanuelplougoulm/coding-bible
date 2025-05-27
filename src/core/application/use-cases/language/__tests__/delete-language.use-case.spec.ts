import { describe, it, expect, beforeEach } from 'vitest';
import { DeleteLanguageUseCase } from '../delete-language.use-case';
import type { LanguageRepository } from '@core/domain/repositories/language.repository';
import type { MockRepository } from '@core/domain/repositories/__tests__/mock-repository';

describe('DeleteLanguageUseCase', () => {
  let useCase: DeleteLanguageUseCase;
  let mockLanguageRepository: MockRepository<'delete'>;

  beforeEach(() => {
    mockLanguageRepository = {
      delete: vi.fn(),
    } as MockRepository<'delete'>;

    useCase = new DeleteLanguageUseCase(
      mockLanguageRepository as LanguageRepository,
    );
  });

  it('should delete a language', async () => {
    const languageId = '123';

    mockLanguageRepository.delete.mockResolvedValue(undefined);

    await useCase.execute(languageId);

    expect(mockLanguageRepository.delete).toHaveBeenCalledWith(languageId);
  });

  it('should handle deletion of non-existent language', async () => {
    const languageId = 'non-existent-id';

    mockLanguageRepository.delete.mockResolvedValue(undefined);

    await useCase.execute(languageId);

    expect(mockLanguageRepository.delete).toHaveBeenCalledWith(languageId);
  });
});
