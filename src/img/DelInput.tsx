import * as React from "react";

const DelInput: React.FC<{
  index: number;
  removeItem: (index: number) => void;
}> = (props) => {
  return (
    <div>
      <svg
        width="24"
        height="24"
        cursor='pointer'
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => props.removeItem(props.index)}
        data-testid='delInputButton'
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 13H8C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11H16C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z"
          fill="#535E6C"
        />
      </svg>
    </div>
  );
};

export default DelInput;