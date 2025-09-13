function wait(msec: number) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

function g1() {
  // TODO: then のネストを無くしなさい
  return wait(1000)
    .then(() => {
      console.log("A");
    })
    .then(() => wait(2000))
    .then(() => {
      console.log("B");
    })
    .then(() => wait(3000))
    .then(() => {
      console.log("C");
    });
}

function g2() {
  // TODO: new Promise を使わないように書き換えなさい
  // wait()のプロミスを使う
  return wait(1000)
    .then(() => console.log("A"))
    .then(() => wait(2000))
    .then(() => console.log("B"))
    .then(() => wait(3000))
    .then(() => console.log("C"));
}

type User = { id: number; name: string };

function g3() {
  // 以下2つの関数が存在するとします (中身は適当)
  function fetchUser() {
    return Promise.resolve({ id: 42, name: "John" });
  }
  function fetchUserFriends(user: User) {
    return Promise.resolve([
      { name: "Sam", id: 100 },
      { name: "Bob", id: 1 },
    ]);
  }

  // TODO: var, let, const による変数宣言を無くしなさい。async/awaitは使用しないこと。
  // ネスト構造にすればよい
  return fetchUser().then((user) => {
    return fetchUserFriends(user).then((friends) => { // user変数のスコープ内でthenを繋げる
      console.log(`${user.name} has ${friends.length} friends!`);
    });
  });
}

function g4() {
  function someFunction() {
    return 42;
  }

  // NOTE: この関数 g4 は Promise を返す必要があるものとする
  // (利用しているフレームワークはライブラリがそういう関数を要求するとでも思って下さい)
  // TODO: new Promise を使わないように書き換えなさい。async/awaitは使用しないこと。
  let value = someFunction();
  // Promise.resolve()を使う（newは使っていない）
  return Promise.resolve(value);
}
