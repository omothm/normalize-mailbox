import assert from 'assert';
import { normalize } from '../src/index';

describe('Gmail', () => {
  it('should remove dots', async () => {
    const normalized = await normalize('joe.k.blow@gmail.com');
    assert.strictEqual(normalized, 'joekblow@gmail.com');
  });
});
