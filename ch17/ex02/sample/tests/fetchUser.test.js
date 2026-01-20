import {Polly} from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';

import {fetchUser} from '../src/fetchUser.js';

// Adapter / Persisterを登録
Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe('fetchUser', () => {
  let polly;

  beforeEach(() => {
    polly = new Polly('fetch-user-test', {
      adapters: ['node-http'],
      persister: 'fs',
      persisterOptions: {
        fs: {
          recordingsDir: './ex02/sample/recordings',
        },
      },
    });
  });

  afterEach(async () => {
    await polly.stop();
  });

  test('ユーザー情報を取得できる', async () => {
    const user = await fetchUser();
    expect(user.id).toBe(1);
    expect(user.name).toBeDefined();
  });
});
