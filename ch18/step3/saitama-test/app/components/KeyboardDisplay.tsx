import React, { useEffect, useState } from "react";
import { checkChar } from "../domain/check-char";

type KeyboardDisplayProps = {
  targetData: string;
};

const KeyboardDisplay: React.FC<KeyboardDisplayProps> = ({ targetData }) => {
  const [typed, setTyped] = useState<string>("");
  const [remaining, setRemaining] = useState<string>(targetData);

  useEffect(() => {
    // キーボード入力を受け取る関数
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      // 文字キーのみ追加（制御キーは無視）
      if (key.length === 1) {
        console.log("target: ", remaining);
        if (checkChar(remaining, key)) {
          setTyped((prev) => prev + key);
          setRemaining((prev) => prev.slice(1));
          // ハイフンの手前の文字を正解すると自動的に次にハイフンを付加
          if (remaining[1] === "-") {
            setTyped((prev) => prev + "-");
            setRemaining((prev) => prev.slice(1));
          }
        }
      }
    };

    // イベントリスナー登録
    window.addEventListener("keydown", handleKeyDown);

    // クリーンアップ
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [remaining]);

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", fontSize: "18px" }}
    >
      <p>{typed}</p>
      <p style={{ fontSize: "14px", color: "gray" }}></p>
    </div>
  );
};

export default KeyboardDisplay;
