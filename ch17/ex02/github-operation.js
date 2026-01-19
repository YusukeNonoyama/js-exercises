import https from 'https';

const GITHUB_API_HOST = 'api.github.com';
const BASE_PATH = '/repos/YusukeNonoyama/js-exercises/issues';

// httpsモジュールでリクエストを送る関数
function request(method, path, body, verbose) {
  // httpsでリクエストを送るためのプロミスを返す
  return new Promise((resolve, reject) => {
    const bodyText = JSON.stringify(body);

    // httpリクエストの設定
    const requestOptions = {
      method,
      host: GITHUB_API_HOST,
      path,
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'gh-issue-cli',
      },
    };

    // リクエスト作成
    const req = https.request(requestOptions);

    // リクエストのボディを書き込み、リクエストを終了
    req.write(bodyText);
    req.end();

    req.on('error', (e) => reject(e));
    req.on('response', (res) => {
      if (res.statusCode >= 300) {
        reject(new Error(`HTTP status ${res.statusCode}`));
        // ストリームをフローイングモードにしてボディを破棄する、レスポンスはreadableストリーム
        res.resume();
        return;
      }

      res.setEncoding('utf-8');

      // レスポンスボディ全体を文字列に書き込む
      let body = '';
      res.on('data', (chunk) => (body += chunk));

      // レスポンスが全て揃った時の処理
      res.on('end', () => {
        let parsedBody;
        try {
          parsedBody = JSON.parse(body);
          resolve(parsedBody);
        } catch (e) {
          reject(e);
        }

        // -vまたは--verboseオプションがtrueの場合のHTTPログ（レスポンス）
        if (verbose) {
          console.log(`response receieving...`);
          console.log(`Status: ${res.statusCode}`);
          console.log('Response body:', parsedBody);
        }
      });
    });

    // -vまたは--verboseオプションがtrueの場合のHTTPログ（リクエスト）
    if (verbose) {
      console.log(`request sending...`);
      console.log(`${method} https://${GITHUB_API_HOST}${path}`);
      console.log('Request body:', body);
    }
  });
}

// Issueをリスト化
export async function listIssues(options) {
  const path = `${BASE_PATH}?state=open`;

  const issues = await request('GET', path, null, options.verbose);

  issues.forEach((issue) => {
    console.log(`#${issue.number}: ${issue.title}`);
  });
}

// Issueを作成
export async function createIssue(options) {
  if (!options.title) {
    throw new Error('--title is required');
  }
  const path = BASE_PATH;
  const issue = await request(
    'POST',
    path,
    {
      title: options.title,
      body: options.body ?? '',
    },
    options.verbose
  );

  console.log(`Created issue #${issue.number}: ${issue.title}`);
}

// Issueをクローズ
export async function closeIssue(options) {
  if (!options.number) {
    throw new Error('--number is required');
  }
  const path = `${BASE_PATH}/${options.number}`;
  const issue = await request('PATCH', path, {state: 'closed'}, options.verbose);
  console.log(`Closed issue #${issue.number}: ${issue.title}`);
}
