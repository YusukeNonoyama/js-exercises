export function bitCount(number) {
    // 符号なしの32-bit表現に変換（やらなくても結果は変わらないが確認出力のため）
    let bitNumber = number >>> 0;
    // 出力確認で".toString(2)"でバイナリ表現にして確認
    console.log("number in 32bit expression: ", bitNumber.toString(2));

    // 32-bit表現の状態で右シフト(>>>)を32回繰り返して、それぞれ1との論理積(&)がtrueの場合にカウントを増やす
    let count = 0; 
    for (let i = 0; i < 32; i++){
        if (bitNumber & 1) count++;
        // 一番左を0にして右へ1桁ずつシフト
        bitNumber = bitNumber >>> 1;
        // console.log("bitNumber: ", bitNumber.toString(2));
    }
    return count;
}

console.log(bitCount(0b1111111111111111111111111111111));
