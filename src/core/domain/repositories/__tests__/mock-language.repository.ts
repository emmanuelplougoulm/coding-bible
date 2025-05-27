import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Language, LanguageDocument } from '../../entities/language.entity';
import { LanguageRepository } from '../language.repository';
import { Types } from 'mongoose';

@Injectable()
export class MockLanguageRepository implements LanguageRepository {
  private languages: Map<string, Language> = new Map();

  constructor(
    @InjectModel(Language.name)
    public readonly model: Model<LanguageDocument>,
  ) {}

  clear(): void {
    this.languages.clear();
  }

  async create(
    language: Omit<Language, '_id' | 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Language> {
    const _id = new Types.ObjectId();
    const id = _id.toString();
    const newLanguage = {
      ...language,
      _id,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Language;
    this.languages.set(id, newLanguage);
    return newLanguage;
  }

  async findById(id: string): Promise<Language | null> {
    const language = this.languages.get(id);
    if (!language) {
      throw new Error('Language not found');
    }
    return language;
  }

  async findAll(): Promise<Language[]> {
    return Array.from(this.languages.values());
  }

  async update(id: string, language: Partial<Language>): Promise<Language> {
    const existingLanguage = this.languages.get(id);
    if (!existingLanguage) {
      throw new Error('Language not found');
    }
    const updatedLanguage = {
      ...existingLanguage,
      ...language,
      id,
      updatedAt: new Date(),
    } as Language;
    this.languages.set(id, updatedLanguage);
    return updatedLanguage;
  }

  async delete(id: string): Promise<void> {
    const language = this.languages.get(id);
    if (!language) {
      throw new Error('Language not found');
    }
    this.languages.delete(id);
  }
}
