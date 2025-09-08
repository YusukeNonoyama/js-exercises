## "$"を変数名に使っているライブラリ

- `argparse/lib/action_container.js`
  >
      var $$ = require('./utils');

## "\_"を変数名に使っているライブラリ

- `@jest/build/BufferedConsole.js`
  >
      class BufferedConsole extends _console().Console {
      _buffer = [];
      _counters = {};
      _timers = {};
      _groupDepth = 0;
      Console = _console().Console;
      ...
      }
