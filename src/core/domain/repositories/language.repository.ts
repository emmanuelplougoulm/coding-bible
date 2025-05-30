import type { Language } from '../entities/language.entity';

export const LANGUAGE_REPOSITORY = Symbol('LANGUAGE_REPOSITORY');

export interface LanguageRepository {
  findById(id: string): Promise<Language | null>;
  findAll(): Promise<Language[]>;
  create(
    language: Omit<Language, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Language>;
  update(id: string, language: Partial<Language>): Promise<Language>;
  delete(id: string): Promise<void>;
}
