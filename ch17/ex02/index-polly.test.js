// Polly.JS を用いて、最初の一回だけ GitHub の API と通信し、そのインタラクションを記録して、
// 次回以降は記録されたレスポンスをリプレイする方法

import {Polly} from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';
import {jest} from '@jest/globals';

import {listIssues, createIssue, closeIssue} from './github-operation.js';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

// 出力確認のためのconsole.logのモック
jest.spyOn(console, 'log').mockImplementation(() => {});

// polly instanceのオプションを定義
const polly_option = {
  adapters: ['node-http'], // Node.js環境でHTTP通信をフック
  persister: 'fs', // 通信内容をローカルファイルに保存
  persisterOptions: {
    fs: {
      recordingsDir: './ex02/recordings',
    },
  },
  recordIfMissing: true, // recordがない場合に実際にリクエストを送り記録する
  matchRequestsBy: {
    headers: false, // リクエストヘッダーが異なっても同じリクエストとみなす
  },
};

// レスポンスを記録する前にリクエストヘッダのTOKEN文字列を置換する関数
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

describe('github-operation-listのテスト', () => {
  let polly;

  beforeEach(async () => {
    // polly instanceを生成
    polly = new Polly('github-operation-list', polly_option);
    replaceToken(polly);
  });

  afterEach(async () => {
    // ここでリクエストを保存
    await polly.stop();
  });

  test('listIssues()の正常レスポンス、verbose: false', async () => {
    await listIssues({verbose: false});
    expect(console.log).toHaveBeenCalledWith('#36: Issue A');
    expect(console.log).toHaveBeenCalledWith('#39: Issue C');
    expect(console.log).not.toHaveBeenCalledWith('response receieving...');
    expect(console.log).not.toHaveBeenCalledWith(`request sending...`);
  });

  test('listIssues()の正常レスポンス、verbose: true', async () => {
    await listIssues({verbose: true});
    expect(console.log).toHaveBeenCalledWith('#36: Issue A');
    expect(console.log).toHaveBeenCalledWith('#39: Issue C');
    expect(console.log).toHaveBeenCalledWith('response receieving...');
    expect(console.log).toHaveBeenCalledWith(`request sending...`);
  });
});

describe('github-operation-createのテスト', () => {
  let polly;

  beforeEach(async () => {
    polly = new Polly('github-operation-create', polly_option);
    replaceToken(polly);
  });

  afterEach(async () => {
    await polly.stop();
  });

  test('createIssue()の正常レスポンス', async () => {
    const title = `Issue C`;
    await createIssue({title, verbose: true});
    expect(console.log).toHaveBeenCalledWith(`Created issue #52: Issue C`);
  });

  test('createIssue()でタイトル指定がない場合のエラー', async () => {
    await expect(createIssue({verbose: false})).rejects.toThrow('--title is required');
  });
});

describe('github-operation-closeのテスト', () => {
  let polly;

  beforeEach(async () => {
    polly = new Polly('github-operation-close', polly_option);
    replaceToken(polly);
  });

  afterEach(async () => {
    await polly.stop();
  });

  test('closeIssue()の正常レスポンス', async () => {
    await closeIssue({number: '37'});
    expect(console.log).toHaveBeenCalledWith('Closed issue #37: Issue B');
  });
  test('closeIssue()でIssue番号の指定がない場合のエラー', async () => {
    await expect(closeIssue({verbose: false})).rejects.toThrow('--number is required');
  });
});
