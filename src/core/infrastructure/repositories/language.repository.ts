import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Language,
  LanguageDocument,
} from '@core/domain/entities/language.entity';
import type { LanguageRepository } from '@core/domain/repositories/language.repository';

@Injectable()
export class LanguageRepositoryImpl implements LanguageRepository {
  constructor(
    @InjectModel(Language.name)
    private languageModel: Model<LanguageDocument>,
  ) {}

  async findById(id: string): Promise<Language | null> {
    const language = await this.languageModel.findById(id).exec();
    return language ? language.toObject() : null;
  }

  async findAll(): Promise<Language[]> {
    const languages = await this.languageModel.find().exec();
    return languages.map((lang) => lang.toObject());
  }

  async create(
    language: Omit<Language, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Language> {
    const createdLanguage = await new this.languageModel(language).save();
    return createdLanguage.toObject();
  }

  async update(id: string, language: Partial<Language>): Promise<Language> {
    const updatedLanguage = await this.languageModel
      .findByIdAndUpdate(id, language, { new: true })
      .exec();
    if (!updatedLanguage) {
      throw new Error('Language not found');
    }
    return updatedLanguage.toObject();
  }

  async delete(id: string): Promise<void> {
    const result = await this.languageModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new Error('Language not found');
    }
  }
}
