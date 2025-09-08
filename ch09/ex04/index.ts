// class
export class WarriorClass {
  atk: number;
  constructor(atk: number) {
    if (!(atk > 0)) {
      throw Error(`atk should be a positive number: ${atk}`);
    }
    this.atk = atk;
  }
  attack() {
    return this.atk * 2;
  }
}

export class MagicWarriorClass extends WarriorClass {
  mgc: number;
  constructor(atk: number, mgc: number) {
    if (!(atk > 0) || !(mgc > 0)) {
      throw Error(
        `atk and mgc should be positive numbers. atk: ${atk}, mgc: ${mgc}`,
      );
    }
    super(atk);
    this.mgc = mgc;
  }
  attack() {
    return super.attack() + this.mgc;
  }
}

// prototype
// 親クラスのコンストラクタ関数
export function Warrior(this: any, atk: number) {
  if (!(atk > 0)) {
    throw Error(`atk should be a positive number: ${atk}`);
  }
  this.atk = atk;
}
// サブクラスのコンストラクタ関数
export function MagicWarrior(this: any, atk: number, mgc: number) {
  if (!(atk > 0) || !(mgc > 0)) {
    throw Error(
      `atk and mgc should be positive numbers. atk: ${atk}, mgc: ${mgc}`,
    );
  }
  this.atk = atk;
  this.mgc = mgc;
}
// 全Warriorオブジェクトが継承するオブジェクト
Warrior.prototype = {
  attack: function () {
    return this.atk * 2;
  },
};
// 全MagicWarriorオブジェクトが継承するオブジェクト
MagicWarrior.prototype = Object.create(Warrior.prototype);
// 親クラスのオーバーライド
MagicWarrior.prototype.attack = function () {
  // 親クラスのattack()を子クラスインスタンスの関数として呼び出し、それにmgcを加える
  return Warrior.prototype.attack.call(this) + this.mgc;
};
