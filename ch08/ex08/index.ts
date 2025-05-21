export function counterGroup() {
    let counterNum = 0
    // keyが追加した順番、valueがcountのオブジェクトを定義
    const countObj: Record<string, number> = {};
    return {
        newCounter: function () {
            let n = 0;
            counterNum++;
            const counterID = counterNum;
            return {
                count: function () {
                    countObj[counterID] = n + 1;
                    return n++;
                },
                reset: function () {
                    countObj[counterID] = 0;
                    n = 0;
                }
            }
        },
        total: function () {
            // オブジェクトからcountだけ抽出した配列を作成して足し合わせ
            const values = Object.values(countObj);
            return values.reduce((x, y) => x + y, 0);
        },
        average: function () {
            if (!counterNum) {
                throw TypeError("no counter exists");
            }
            // totalを呼び出して平均を計算
            return this.total() / counterNum;
        },
        variance: function () {
            if (counterNum < 2) {
                throw TypeError("less than two counters");
            }
            const values = Object.values(countObj);
            const average  = this.average();
            // 平均との差分を２乗して足し合わせる → counter数で割る → variance
            return values.reduce((x, y) => x + (average - y) ** 2, 0) / counterNum;
        }
    };
};