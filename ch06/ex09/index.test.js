import jest from 'jest-mock';

test('', () => {
  const mock = jest.fn();

  const obj = {
    x: 0,
    y: 0,
    sum() {
      mock();   // 呼ばれた場合22行目がtrueになる。sum()が呼ばれたかどうかの確認。
      return this.x + this.y;
    },
  };

  // ここに１行のコードを書く
  obj["toJSON"] = function () { return { x: this.x, y: this.y, sum: this.sum() }; };

  obj.x = 1;
  obj.y = 2;

  expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
  expect(mock).toHaveBeenCalled();
});