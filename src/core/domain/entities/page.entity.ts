export class Page {
  constructor(
    public readonly id: string,
    public readonly topicId: string,
    public readonly title: string,
    public readonly description: string,
    public readonly order: number,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}
}
