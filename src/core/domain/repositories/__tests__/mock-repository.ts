import type { Mock } from 'vitest';
import type { LanguageRepository } from '../language.repository';

export type MockRepository<T extends keyof LanguageRepository> = {
  [K in T]: Mock;
} & Partial<Omit<LanguageRepository, T>>;
