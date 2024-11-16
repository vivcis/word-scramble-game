import { describe, it, expect } from 'vitest';
import { scrambleWord } from './utils';

describe('scrambleWord', () => {
  it('should return a string', () => {
    const result = scrambleWord('test');
    expect(typeof result).toBe('string');
  });

  it('should return a scrambled version of the word', () => {
    const word = 'javascript';
    const scrambled = scrambleWord(word);
    expect(scrambled).not.toBe(word);
    expect(scrambled.length).toBe(word.length);
    // Ensure all original letters are present
    expect(scrambled.split('').sort().join('')).toBe(word.split('').sort().join(''));
  });

  it('should handle empty strings', () => {
    const result = scrambleWord('');
    expect(result).toBe('');
  });

  it('should handle single-character strings', () => {
    const result = scrambleWord('a');
    expect(result).toBe('a');
  });
});
