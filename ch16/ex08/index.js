import https from "https";

const GITHUB_API_HOST = "api.github.com";
const BASE_PATH = "/repos/YusukeNonoyama/js-exercises/issues"
const TOKEN = process.env.GITHUB_TOKEN;

if (!TOKEN) {
  console.error("Error: GITHUB_TOKEN is not set");
  process.exit(1);
}

//// 実行フェーズ
// 引数をパース
const { command, args, options } = parseArgs(process.argv);

// ヘルプを表示条件の場合はヘルプを表示して終了
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


// ヘルプ表示
function showHelp() {
  console.log(`
Usage:
  node ch16/ex08/index2.js [options] <command> [arguments]

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

// オプション（--help, -h, --verbose, -v）、コマンド（list、create、close）、コマンドの引数に分割
function parseArgs(argv) {
  const args = argv.slice(2);
  const options = {
    verbose: false,
  };

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

  const command = args.shift();
  return { command, args, options };
}

// コマンドの引数
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

// リクエストを送る関数
function request(method, path, body, verbose) {
  const data = body ? JSON.stringify(body) : null;

  const options = {
    hostname: GITHUB_API_HOST,
    path,
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "gh-issue-cli",
    },
  };

  if (verbose) {
    console.log(`request sending...`);
    console.log(`${method} https://${GITHUB_API_HOST}${path}`);
    if (data) console.log("Request body:", body);
  }

  // httpsでリクエストを送るためのプロミスを返す
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let raw = "";

      res.on("data", chunk => (raw += chunk));
      res.on("end", () => {
        let parsed;
        try {
          parsed = JSON.parse(raw);
        } catch {
          parsed = raw;
        }

        if (verbose) {
          console.log(`response receieving...`);
          console.log(`Status: ${res.statusCode}`);
        }

        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(
            new Error(`HTTP ${res.statusCode}: ${JSON.stringify(parsed)}`)
          );
          return;
        }

        resolve(parsed);
      });
    });

    req.on("error", reject);

    if (data) req.write(data);
    req.end();
  });
}

// Issueをリスト化
async function listIssues(options) {
  const path = `${BASE_PATH}?state=open`;

  const issues = await request(
    "GET",
    path,
    null,
    options.verbose
  );

  issues.forEach(issue => {
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
    options.verbose
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
    options.verbose
  );
  console.log(`Closed issue #${issue.number}: ${issue.title}`);
}