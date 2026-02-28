import React, { useEffect } from "react";

type StartButtonProps = {
  setIsOnGame: React.Dispatch<React.SetStateAction<boolean>>;
};

const StartButton: React.FC<StartButtonProps> = ({ setIsOnGame }) => {
  const handleClick = (): void => {
    setIsOnGame(true);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setIsOnGame(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOnGame]);

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      Start
    </button>
  );
};

export default StartButton;
