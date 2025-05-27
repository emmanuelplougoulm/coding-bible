import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Language,
  LanguageSchema,
} from '@core/domain/entities/language.entity';
import { TestConfig } from '@config/test.config';
import { LANGUAGE_REPOSITORY } from '@core/domain/repositories/language.repository';
import { MockLanguageRepository } from '@core/domain/repositories/__tests__/mock-language.repository';
import { CreateLanguageUseCase } from '../create-language.use-case';
import { FindLanguageUseCase } from '../find-language.use-case';
import { FindAllLanguagesUseCase } from '../find-all-languages.use-case';
import { UpdateLanguageUseCase } from '../update-language.use-case';
import { DeleteLanguageUseCase } from '../delete-language.use-case';

describe('Language Use Cases Integration Tests', () => {
  let module: TestingModule;
  let repository: MockLanguageRepository;
  let createLanguageUseCase: CreateLanguageUseCase;
  let findLanguageUseCase: FindLanguageUseCase;
  let findAllLanguagesUseCase: FindAllLanguagesUseCase;
  let updateLanguageUseCase: UpdateLanguageUseCase;
  let deleteLanguageUseCase: DeleteLanguageUseCase;

  beforeAll(async () => {
    const mongooseOptions = await TestConfig.getMongooseOptions();
    const uri = mongooseOptions.uri;
    if (!uri) {
      throw new Error('MongoDB URI is undefined');
    }

    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([
          { name: Language.name, schema: LanguageSchema },
        ]),
      ],
      providers: [
        MockLanguageRepository,
        {
          provide: LANGUAGE_REPOSITORY,
          useExisting: MockLanguageRepository,
        },
        {
          provide: 'LanguageRepository',
          useExisting: MockLanguageRepository,
        },
        CreateLanguageUseCase,
        FindLanguageUseCase,
        FindAllLanguagesUseCase,
        UpdateLanguageUseCase,
        DeleteLanguageUseCase,
      ],
    }).compile();

    repository = module.get<MockLanguageRepository>(MockLanguageRepository);
    createLanguageUseCase = module.get<CreateLanguageUseCase>(
      CreateLanguageUseCase,
    );
    findLanguageUseCase = module.get<FindLanguageUseCase>(FindLanguageUseCase);
    findAllLanguagesUseCase = module.get<FindAllLanguagesUseCase>(
      FindAllLanguagesUseCase,
    );
    updateLanguageUseCase = module.get<UpdateLanguageUseCase>(
      UpdateLanguageUseCase,
    );
    deleteLanguageUseCase = module.get<DeleteLanguageUseCase>(
      DeleteLanguageUseCase,
    );
  });

  afterAll(async () => {
    await module.close();
    await TestConfig.closeMongoMemoryServer();
  });

  beforeEach(async () => {
    await repository['model'].deleteMany({});
    repository.clear();
  });

  describe('CreateLanguageUseCase', () => {
    it('should create a new language', async () => {
      const languageData = {
        name: 'TypeScript',
        description: 'A typed superset of JavaScript',
        icon: 'ts-icon',
      };

      const language = await createLanguageUseCase.execute(languageData);

      expect(language).toBeDefined();
      expect(language.name).toBe(languageData.name);
      expect(language.description).toBe(languageData.description);
      expect(language.icon).toBe(languageData.icon);
    });
  });

  describe('FindLanguageUseCase', () => {
    it('should find a language by id', async () => {
      const languageData = {
        name: 'JavaScript',
        description: 'The programming language of the web',
      };

      const createdLanguage = await createLanguageUseCase.execute(languageData);
      const foundLanguage = await findLanguageUseCase.execute(
        createdLanguage.id,
      );

      expect(foundLanguage).toBeDefined();
      if (!foundLanguage) {
        throw new Error('Language not found');
      }
      expect(foundLanguage.id).toBe(createdLanguage.id);
      expect(foundLanguage.name).toBe(languageData.name);
    });

    it('should throw error when language is not found', async () => {
      await expect(
        findLanguageUseCase.execute('non-existent-id'),
      ).rejects.toThrow();
    });
  });

  describe('FindAllLanguagesUseCase', () => {
    it('should return all languages', async () => {
      const languages = [
        {
          name: 'TypeScript',
          description: 'A typed superset of JavaScript',
        },
        {
          name: 'JavaScript',
          description: 'The programming language of the web',
        },
      ];

      await Promise.all(
        languages.map((lang) => createLanguageUseCase.execute(lang)),
      );
      const foundLanguages = await findAllLanguagesUseCase.execute();

      expect(foundLanguages).toHaveLength(2);
      expect(foundLanguages[0].name).toBe(languages[0].name);
      expect(foundLanguages[1].name).toBe(languages[1].name);
    });
  });

  describe('UpdateLanguageUseCase', () => {
    it('should update a language', async () => {
      const languageData = {
        name: 'JavaScript',
        description: 'The programming language of the web',
      };

      const createdLanguage = await createLanguageUseCase.execute(languageData);
      const updateData = {
        name: 'JS',
        description: 'Updated description',
      };

      const updatedLanguage = await updateLanguageUseCase.execute(
        createdLanguage.id,
        updateData,
      );

      expect(updatedLanguage).toBeDefined();
      expect(updatedLanguage.name).toBe(updateData.name);
      expect(updatedLanguage.description).toBe(updateData.description);
    });

    it('should throw error when language to update is not found', async () => {
      const updateData = {
        name: 'JS',
        description: 'Updated description',
      };

      await expect(
        updateLanguageUseCase.execute('non-existent-id', updateData),
      ).rejects.toThrow();
    });
  });

  describe('DeleteLanguageUseCase', () => {
    it('should delete a language', async () => {
      const languageData = {
        name: 'JavaScript',
        description: 'The programming language of the web',
      };

      const createdLanguage = await createLanguageUseCase.execute(languageData);
      await deleteLanguageUseCase.execute(createdLanguage.id);

      await expect(
        findLanguageUseCase.execute(createdLanguage.id),
      ).rejects.toThrow();
    });

    it('should throw error when language to delete is not found', async () => {
      await expect(
        deleteLanguageUseCase.execute('non-existent-id'),
      ).rejects.toThrow();
    });
  });
});
