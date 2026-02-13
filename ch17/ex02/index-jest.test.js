// Jest のモック関数 を利用して GitHub の API をモックする方法

import {jest} from '@jest/globals';

process.env.GITHUB_TOKEN = 'test-token';

// HTTPSリクエストメソッドのモック
const requestMock = {
  write: jest.fn(),
  end: jest.fn(),
  on: jest.fn(),
};

// レスポンスのモック
const responseMock = {
  statusCode: 200,
  setEncoding: jest.fn(),
  on: jest.fn(),
  resume: jest.fn(),
};

// HTTPSリクエストが成功した時のモックの挙動を定義
function mockSuccessResponse(data) {
  // requestメソッドをモック
  requestMock.on.mockImplementation((event, cb) => {
    if (event === 'response') {
      // responseが受け取れた場合の挙動を定義
      responseMock.on.mockImplementation((resEvent, resCb) => {
        if (resEvent === 'data') resCb(data);
        if (resEvent === 'end') resCb();
      });
      // リクエストのコールバックをレスポンスを引数にして呼ぶ
      cb(responseMock);
    }
  });
}

// 出力確認のためのconsole.logのモック
jest.spyOn(console, 'log').mockImplementation(() => {});

// httpモジュールのdefault exportであるrequestメソッドを上書きしてrequestMockを返すようにする
// ESMではjest.mock()が使えずjest.unstable_mockModule()メソッドを使う
jest.unstable_mockModule('https', () => ({
  default: {
    request: jest.fn(() => requestMock),
  },
}));

// モックを定義してからインポート（上書きしたhttpsもここでインポート）
const {listIssues, createIssue, closeIssue} = await import('./github-operation.js');

describe('github-operationのテスト', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('listIssues()の正常レスポンス、verbose: false', async () => {
    mockSuccessResponse(
      JSON.stringify([
        {number: 1, title: 'Bug A'},
        {number: 2, title: 'Bug B'},
      ])
    );

    await listIssues({verbose: false});

    expect(console.log).toHaveBeenCalledWith('#1: Bug A');
    expect(console.log).toHaveBeenCalledWith('#2: Bug B');
    expect(console.log).not.toHaveBeenCalledWith('response receieving...');
    expect(console.log).not.toHaveBeenCalledWith(`request sending...`);
  });

  test('listIssues()の正常レスポンス、verbose: true', async () => {
    mockSuccessResponse([
      JSON.stringify([
        {number: 1, title: 'Bug A'},
        {number: 2, title: 'Bug B'},
      ]),
    ]);

    await listIssues({verbose: true});

    expect(console.log).toHaveBeenCalledWith('#1: Bug A');
    expect(console.log).toHaveBeenCalledWith('#2: Bug B');
    expect(console.log).toHaveBeenCalledWith('response receieving...');
    expect(console.log).toHaveBeenCalledWith(`request sending...`);
  });

  test('createIssue()の正常レスポンス)', async () => {
    mockSuccessResponse(JSON.stringify({number: 10, title: 'New Issue'}));

    await createIssue({title: 'New Issue', verbose: false});

    expect(requestMock.write).toHaveBeenCalledWith(JSON.stringify({title: 'New Issue', body: ''}));

    expect(console.log).toHaveBeenCalledWith('Created issue #10: New Issue');
  });

  test('createIssue()でタイトル指定がない場合のエラー', async () => {
    await expect(createIssue({verbose: false})).rejects.toThrow('--title is required');
  });

  test('closeIssue()の正常レスポンス', async () => {
    mockSuccessResponse(JSON.stringify({number: 5, title: 'Old Issue'}));

    await closeIssue({number: 5, verbose: false});

    expect(requestMock.write).toHaveBeenCalledWith(JSON.stringify({state: 'closed'}));

    expect(console.log).toHaveBeenCalledWith('Closed issue #5: Old Issue');
  });

  test('closeIssue()でIssue番号の指定がない場合のエラー', async () => {
    await expect(closeIssue({verbose: false})).rejects.toThrow('--number is required');
  });
});
