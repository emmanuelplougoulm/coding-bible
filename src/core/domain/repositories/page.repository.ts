import type { Page } from '../entities/page.entity';

export interface PageRepository {
  findById(id: string): Promise<Page | null>;
  findByTopicId(topicId: string): Promise<Page[]>;
  findAll(): Promise<Page[]>;
  create(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Promise<Page>;
  update(id: string, page: Partial<Page>): Promise<Page>;
  delete(id: string): Promise<void>;
}
