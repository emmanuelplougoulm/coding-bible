import type { Topic } from '../entities/topic.entity';

export interface TopicRepository {
  findById(id: string): Promise<Topic | null>;
  findByLanguageId(languageId: string): Promise<Topic[]>;
  findAll(): Promise<Topic[]>;
  create(topic: Omit<Topic, 'id' | 'createdAt' | 'updatedAt'>): Promise<Topic>;
  update(id: string, topic: Partial<Topic>): Promise<Topic>;
  delete(id: string): Promise<void>;
}
