import { describe, it, expect } from 'vitest';
import { Language } from '../language.entity';

describe('Language Entity', () => {
  it('should create a language instance with required properties', () => {
    const language = new Language();
    language.name = 'TypeScript';
    language.description = 'A typed superset of JavaScript';

    expect(language).toBeDefined();
    expect(language.name).toBe('TypeScript');
    expect(language.description).toBe('A typed superset of JavaScript');
  });

  it('should create a language instance with optional icon', () => {
    const language = new Language();
    language.name = 'TypeScript';
    language.description = 'A typed superset of JavaScript';
    language.icon = 'typescript-icon.png';

    expect(language.icon).toBe('typescript-icon.png');
  });

  it('should create a language instance without optional icon', () => {
    const language = new Language();
    language.name = 'TypeScript';
    language.description = 'A typed superset of JavaScript';

    expect(language.icon).toBeUndefined();
  });
});
