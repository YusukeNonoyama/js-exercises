// class
export class WarriorClass {
    atk: number;
    constructor(atk: number) {
        if (isNaN(atk)) {
            throw Error("atk is NaN");
        }
        this.atk = atk;
    }
    attack() { return this.atk * 2 };
}

export class MagicWarriorClass extends WarriorClass {
    mgc: number;
    constructor(atk: number, mgc: number) {
        if (isNaN(atk) || isNaN(mgc)) {
            throw Error("atk is NaN");
        }
        super(atk);
        this.mgc = mgc;
    }
    attack() { return super.attack() + this.mgc };
}

// prototype
// 親クラスのコンストラクタ関数
export function Warrior(this: any, atk: number) {
    if (isNaN(atk)) {
        throw Error("atk is NaN");
    }
    this.atk = atk;
}
// サブクラスのコンストラクタ関数
export function MagicWarrior(this: any, atk: number, mgc: number) {
    if (isNaN(atk) || isNaN(mgc)) {
        throw Error("atk is NaN");
    }
    this.atk = atk;
    this.mgc = mgc;
}
// 親クラスのプロトタイプ
Warrior.prototype = {
    attack: function () {
        return this.atk * 2;
    }
}
// プロトタイプの継承
MagicWarrior.prototype = Object.create(Warrior.prototype);
// 親クラスをオーバーライド
MagicWarrior.prototype.attack = function () {
    // 親クラスのattack()を子クラスインスタンスの関数として呼び出し、それにmgcを加える
    return Warrior.prototype.attack.call(this) + this.mgc;
}


