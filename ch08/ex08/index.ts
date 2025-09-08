export function counterGroup() {
  let counterNum = 0;
  const countObj: Record<string, number> = {};
  return {
    newCounter() {
      counterNum++;
      // カウンタを加えた順番がカウンタのIDになる
      const counterID = counterNum;
      // カウンタの初期状態をセット
      countObj[counterID] = 0;
      return {
        count: function () {
          return countObj[counterID]++;
        },
        reset: function () {
          countObj[counterID] = 0;
        },
      };
    },
    total() {
      const values = Object.values(countObj);
      return values.reduce((x, y) => x + y, 0);
    },
    average() {
      if (!counterNum) {
        throw TypeError("no counter exists");
      }
      // totalを呼び出して平均を計算
      return this.total() / counterNum;
    },
    variance() {
      if (counterNum < 2) {
        throw TypeError("less than two counters");
      }
      const values = Object.values(countObj);
      const average = this.average();
      // 平均との差分を２乗して足し合わせる → counter数で割る → variance
      return (
        values.reduce((acc, val) => acc + (average - val) ** 2, 0) / counterNum
      );
    },
  };
}
