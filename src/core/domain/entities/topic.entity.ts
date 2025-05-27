export class Topic {
  constructor(
    public readonly id: string,
    public readonly languageId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly order: number,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}
}
