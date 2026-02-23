import React from "react";

type StartButtonProps = {
  isOnGame: boolean;
  setIsOnGame: React.Dispatch<React.SetStateAction<boolean>>;
};

const StartButton: React.FC<StartButtonProps> = ({ isOnGame, setIsOnGame }) => {
  const handleClick = (): void => {
    setIsOnGame(true);
  };

  if (isOnGame) return null;

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
