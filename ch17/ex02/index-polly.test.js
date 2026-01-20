import {Polly} from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';
import {jest} from '@jest/globals';

import {listIssues, createIssue, closeIssue} from './github-operation.js';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

// 出力確認のためのconsole.logのモック
jest.spyOn(console, 'log').mockImplementation(() => {});

const polly_option = {
  adapters: ['node-http'],
  persister: 'fs',
  persisterOptions: {
    fs: {
      recordingsDir: './ex02/recordings',
    },
  },
  recordIfMissing: true,
  logging: false,
  matchRequestsBy: {
    headers: false,
    order: false,
  },
};

// TOKEN部分を置換する関数
function replaceToken(polly) {
  polly.server.any().on('beforePersist', (_req, recording) => {
    recording.request.headers = recording.request.headers?.map((header) => {
      if (header.name.toLowerCase() === 'authorization') {
        return {
          ...header,
          value: 'Bearer REDACTED',
        };
      }
      return header;
    });
  });
}

describe('github-operation-list', () => {
  let polly;

  beforeEach(async () => {
    polly = new Polly('github-operation-list', polly_option);
    replaceToken(polly);
  });

  afterEach(async () => {
    await polly.stop();
  });

  test('listIssues()', async () => {
    await listIssues({verbose: false});
    expect(console.log).toHaveBeenCalledWith('#36: Issue A');
    expect(console.log).toHaveBeenCalledWith('#38: Issue C');
  });
});

describe('github-operation-create', () => {
  let polly;

  beforeEach(async () => {
    polly = new Polly('github-operation-create', polly_option);
    replaceToken(polly);
  });

  afterEach(async () => {
    await polly.stop();
  });

  test('createIssue creates an issue', async () => {
    const title = `Issue C`;
    await createIssue({title, verbose: true});
    expect(console.log).toHaveBeenCalledWith(`Created issue #52: Issue C`);
  });
});

describe('github-operation-close', () => {
  let polly;

  beforeEach(async () => {
    polly = new Polly('github-operation-close', polly_option);
    replaceToken(polly);
  });

  afterEach(async () => {
    await polly.stop();
  });

  test('closeIssue closes an issue', async () => {
    await closeIssue({number: '37'});
    expect(console.log).toHaveBeenCalledWith('Closed issue #37: Issue B');
  });
});
