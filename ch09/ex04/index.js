// prototype
{
    // 親クラスのコンストラクタ関数
    function Warrior(atk) {
        this.atk = atk;
    }

    // サブクラスのコンストラクタ関数
    function MagicWarrior(atk, mgc) {
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

    let mw1 = new MagicWarrior(10, 90);
    console.log(mw1.attack());
}


