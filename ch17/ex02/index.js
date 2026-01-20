import {listIssues, createIssue, closeIssue} from './github-operation.js';

// オプション、コマンド、コマンド引数の配列に分割
function parseArgs(argv) {
  const args = argv.slice(2);
  const options = {verbose: false};

  // optionがある場合はフラグをtrueにする
  while (args.length > 0) {
    if (args[0] === '-h' || args[0] === '--help') {
      options.help = true;
      args.shift();
    } else if (args[0] === '-v' || args[0] === '--verbose') {
      options.verbose = true;
      args.shift();
    } else {
      break;
    }
  }

  // コマンド： list,、create、close
  const command = args.shift();

  return {command, args, options};
}

// optionとcommandを除いた引数の配列argsをオブジェクトに変換
function parseCommandOptions(args) {
  const opts = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = args[i + 1];
      if (!value || value.startsWith('-')) {
        throw new Error(`Option --${key} requires a value`);
      }
      opts[key] = value;
      i++;
    }
  }

  return opts;
}

//// 実行開始
// GITHUB_TOKENの環境設定を確認
const TOKEN = process.env.GITHUB_TOKEN;

if (!TOKEN) {
  console.log('GITHUB_TOKEN is not set');
  process.exit(1);
}

// 標準入力の引数をパース
const {command, args, options} = parseArgs(process.argv);

// ヘルプのフラグがtrueか引数未指定の場合はヘルプを表示して終了
if (options.help || !command) {
  showHelp();
  process.exit(0);
}

// コマンドの引数をオプションに追加
Object.assign(options, parseCommandOptions(args));

switch (command) {
  case 'list': {
    await listIssues(options);
    break;
  }

  case 'create': {
    await createIssue(options);
    break;
  }

  case 'close': {
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
