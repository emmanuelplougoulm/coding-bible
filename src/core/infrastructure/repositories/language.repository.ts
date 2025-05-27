import { Injectable } from '@nestjs/common';
import { Language } from '@core/domain/entities/language.entity';
import type { LanguageRepository } from '@core/domain/repositories/language.repository';

@Injectable()
export class LanguageRepositoryImpl implements LanguageRepository {
  private languages: Language[] = [];

  async findById(id: string): Promise<Language | null> {
    return this.languages.find((lang) => lang.id === id) || null;
  }

  async findAll(): Promise<Language[]> {
    return [...this.languages];
  }

  async create(
    language: Omit<Language, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Language> {
    const newLanguage = new Language(
      crypto.randomUUID(),
      language.name,
      language.description,
      language.icon,
    );
    this.languages.push(newLanguage);
    return newLanguage;
  }

  async update(id: string, language: Partial<Language>): Promise<Language> {
    const index = this.languages.findIndex((lang) => lang.id === id);
    if (index === -1) {
      throw new Error('Language not found');
    }

    const updatedLanguage = new Language(
      id,
      language.name ?? this.languages[index].name,
      language.description ?? this.languages[index].description,
      language.icon ?? this.languages[index].icon,
      this.languages[index].createdAt,
      new Date(),
    );

    this.languages[index] = updatedLanguage;
    return updatedLanguage;
  }

  async delete(id: string): Promise<void> {
    const index = this.languages.findIndex((lang) => lang.id === id);
    if (index === -1) {
      throw new Error('Language not found');
    }
    this.languages.splice(index, 1);
  }
}
