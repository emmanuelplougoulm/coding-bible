export enum ResourceType {
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  LINK = 'LINK',
  TEXT = 'TEXT',
}

export interface ResourceMetadata {
  language?: string;
  url?: string;
  alt?: string;
  [key: string]: unknown;
}

export class Resource {
  constructor(
    public readonly id: string,
    public readonly pageId: string,
    public readonly type: ResourceType,
    public readonly content: string,
    public readonly order: number,
    public readonly metadata: ResourceMetadata = {},
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}
}
