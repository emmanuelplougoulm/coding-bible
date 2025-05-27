import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { Language, LanguageSchema } from '../../entities/language.entity';
import { TestConfig } from '@config/test.config';
import { MockLanguageRepository } from './mock-language.repository';

describe('LanguageRepository Integration Tests', () => {
  let module: TestingModule;
  let repository: MockLanguageRepository;

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
      providers: [MockLanguageRepository],
    }).compile();

    repository = module.get<MockLanguageRepository>(MockLanguageRepository);
  });

  afterAll(async () => {
    await module.close();
    await TestConfig.closeMongoMemoryServer();
  });

  beforeEach(async () => {
    await repository.model.deleteMany({});
  });

  describe('create', () => {
    it('should create a new language', async () => {
      const languageData = {
        name: 'TypeScript',
        description: 'A typed superset of JavaScript',
        icon: 'ts-icon',
      };

      const language = await repository.create(languageData);

      expect(language).toBeDefined();
      expect(language.name).toBe(languageData.name);
      expect(language.description).toBe(languageData.description);
      expect(language.icon).toBe(languageData.icon);
    });
  });

  describe('findById', () => {
    it('should find a language by id', async () => {
      const languageData = {
        name: 'JavaScript',
        description: 'The programming language of the web',
      };

      const createdLanguage = await repository.create(languageData);
      const foundLanguage = await repository.findById(createdLanguage.id);

      expect(foundLanguage).toBeDefined();
      if (!foundLanguage) {
        throw new Error('Language not found');
      }
      expect(foundLanguage.id).toBe(createdLanguage.id);
      expect(foundLanguage.name).toBe(languageData.name);
    });

    it('should return null when language is not found', async () => {
      const foundLanguage = await repository.findById('non-existent-id');
      expect(foundLanguage).toBeNull();
    });
  });

  describe('findAll', () => {
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

      await Promise.all(languages.map((lang) => repository.create(lang)));
      const foundLanguages = await repository.findAll();

      expect(foundLanguages).toHaveLength(2);
      expect(foundLanguages[0].name).toBe(languages[0].name);
      expect(foundLanguages[1].name).toBe(languages[1].name);
    });
  });

  describe('update', () => {
    it('should update a language', async () => {
      const languageData = {
        name: 'JavaScript',
        description: 'The programming language of the web',
      };

      const createdLanguage = await repository.create(languageData);
      const updateData = {
        name: 'JS',
        description: 'Updated description',
      };

      const updatedLanguage = await repository.update(
        createdLanguage.id,
        updateData,
      );

      expect(updatedLanguage).toBeDefined();
      expect(updatedLanguage.name).toBe(updateData.name);
      expect(updatedLanguage.description).toBe(updateData.description);
    });
  });

  describe('delete', () => {
    it('should delete a language', async () => {
      const languageData = {
        name: 'JavaScript',
        description: 'The programming language of the web',
      };

      const createdLanguage = await repository.create(languageData);
      await repository.delete(createdLanguage.id);

      const foundLanguage = await repository.findById(createdLanguage.id);
      expect(foundLanguage).toBeNull();
    });
  });
});
