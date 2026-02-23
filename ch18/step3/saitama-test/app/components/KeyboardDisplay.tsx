import React, { useEffect, useState } from "react";

type KeyboardDisplayProps = {
  isOnGame: boolean;
};

const KeyboardDisplay: React.FC<KeyboardDisplayProps> = ({ isOnGame }) => {
  const [inputChars, setInputChars] = useState<string>("");

  useEffect(() => {
    // キーボード入力を受け取る関数
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (isOnGame === true) {
        // 文字キーのみ追加（制御キーは無視）
        if (key.length === 1) {
          setInputChars((prev) => prev + key);
        } else if (key === "Backspace") {
          setInputChars((prev) => prev.slice(0, -1));
        } else if (key === "Enter") {
          setInputChars("");
        }
      }
    };

    // イベントリスナー登録
    window.addEventListener("keydown", handleKeyDown);

    // クリーンアップ
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOnGame]);

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", fontSize: "18px" }}
    >
      <p>{inputChars || "answer"}</p>
      <p style={{ fontSize: "14px", color: "gray" }}></p>
    </div>
  );
};

export default KeyboardDisplay;
