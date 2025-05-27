export class CreateLanguageDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly icon?: string,
  ) {}
}

export class UpdateLanguageDto {
  constructor(
    public readonly name?: string,
    public readonly description?: string,
    public readonly icon?: string,
  ) {}
}
