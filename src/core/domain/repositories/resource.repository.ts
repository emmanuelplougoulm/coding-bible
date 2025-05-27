import type { Resource } from '../entities/resource.entity';

export interface ResourceRepository {
  findById(id: string): Promise<Resource | null>;
  findByPageId(pageId: string): Promise<Resource[]>;
  findAll(): Promise<Resource[]>;
  create(
    resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Resource>;
  update(id: string, resource: Partial<Resource>): Promise<Resource>;
  delete(id: string): Promise<void>;
}
