import https from "https";

const GITHUB_API_HOST = "api.github.com";
const BASE_PATH = "/repos/YusukeNonoyama/js-exercises/issues";
const TOKEN = process.env.GITHUB_TOKEN;

if (!TOKEN) {
  console.log("GITHUB_TOKEN is not set");
  process.exit(1);
}

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
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "gh-issue-cli",
      },
    };

    // リクエスト作成
    const req = https.request(requestOptions);

    // リクエストのボディを書き込み、リクエストを終了
    req.write(bodyText);
    req.end();

    req.on("error", (e) => reject(e));
    req.on("response", (res) => {
      if (res.statusCode >= 300) {
        reject(new Error(`HTTP status ${res.statusCode}`));
        // ストリームをフローイングモードにしてボディを破棄する、レスポンスはreadableストリーム
        res.resume();
        return;
      }

      res.setEncoding("utf-8");

      // レスポンスボディ全体を文字列に書き込む
      let body = "";
      res.on("data", (chunk) => (body += chunk));

      // レスポンスが全て揃った時の処理
      res.on("end", () => {
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
          console.log("Response body:", parsedBody);
        }
      });
    });

    // -vまたは--verboseオプションがtrueの場合のHTTPログ（リクエスト）
    if (verbose) {
      console.log(`request sending...`);
      console.log(`${method} https://${GITHUB_API_HOST}${path}`);
      console.log("Request body:", body);
    }
  });
}

// オプション、コマンド、コマンド引数の配列に分割
function parseArgs(argv) {
  const args = argv.slice(2);
  const options = { verbose: false };

  // optionがある場合はフラグをtrueにする
  while (args.length > 0) {
    if (args[0] === "-h" || args[0] === "--help") {
      options.help = true;
      args.shift();
    } else if (args[0] === "-v" || args[0] === "--verbose") {
      options.verbose = true;
      args.shift();
    } else {
      break;
    }
  }

  // コマンド： list,、create、close
  const command = args.shift();

  return { command, args, options };
}

// optionとcommandを除いた引数の配列argsをオブジェクトに変換（--title xxx とか--number yyy とか）
function parseCommandOptions(args) {
  const opts = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = args[i + 1];
      if (!value || value.startsWith("-")) {
        throw new Error(`Option --${key} requires a value`);
      }
      opts[key] = value;
      i++;
    }
  }

  return opts;
}

// Issueをリスト化
async function listIssues(options) {
  const path = `${BASE_PATH}?state=open`;

  const issues = await request("GET", path, null, options.verbose);

  issues.forEach((issue) => {
    console.log(`#${issue.number}: ${issue.title}`);
  });
}

// Issueを作成
async function createIssue(options) {
  if (!options.title) {
    throw new Error("--title is required");
  }
  const path = BASE_PATH;
  const issue = await request(
    "POST",
    path,
    {
      title: options.title,
      body: options.body ?? "",
    },
    options.verbose,
  );

  console.log(`Created issue #${issue.number}: ${issue.title}`);
}

// Issueをクローズ
async function closeIssue(options) {
  if (!options.number) {
    throw new Error("--number is required");
  }
  const path = `${BASE_PATH}/${options.number}`;
  const issue = await request(
    "PATCH",
    path,
    { state: "closed" },
    options.verbose,
  );
  console.log(`Closed issue #${issue.number}: ${issue.title}`);
}

// ヘルプ表示
function showHelp() {
  console.log(`
Usage:
  node ch16/ex08/index.js [options] <command> [arguments]

Commands:
  list
      openのIssueリストを表示する

  create --title <title>
      Issueを作成する

  close --number <issue_number>
      指定したissueをクローズする

Options:
  -h, --help       ヘルプを表示
  -v, --verbose    HTTP logs を出力
`);
}

//// 実行開始
// 標準入力の引数をパース
const { command, args, options } = parseArgs(process.argv);

// ヘルプのフラグがtrueか引数未指定の場合はヘルプを表示して終了
if (options.help || !command) {
  showHelp();
  process.exit(0);
}

// コマンドの引数をオプションに追加
Object.assign(options, parseCommandOptions(args));

switch (command) {
  case "list": {
    await listIssues(options);
    break;
  }

  case "create": {
    await createIssue(options);
    break;
  }

  case "close": {
    await closeIssue(options);
    break;
  }

  default:
    throw new Error(`Unknown command: ${command}`);
}
