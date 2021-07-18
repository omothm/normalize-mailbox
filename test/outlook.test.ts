import assert from 'assert';
import normalize from '../src/index';

describe('Outlook', () => {
  it('should not remove dots', async () => {
    const normalized = await normalize('joe.k.blow@live.com');
    assert.strictEqual(normalized, 'joe.k.blow@live.com');
  });
});
