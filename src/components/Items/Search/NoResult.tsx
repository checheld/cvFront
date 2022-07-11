import { Typography } from "@mui/material";
import * as React from "react";
import PcIcon from "../../../Icons/IconForResult/PcIcon";

const NoResult: React.FC = () => {
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  let text: string[] = [];
  const variant: number = React.useMemo(() => getRandomInt(5), []);
  if (variant === 0) {
    text[0] = `Sorry, there are no results for this search`;
    text[1] = "We couldn't find something here";
  } else {
    text[0] = `Meow Meow!`;
    text[1] = `Please try another phrase`;
  }

  return (
    <div className="noResult">
      {variant === 0 ? (
        <PcIcon />
      ) : (
        <div style={{ width: `330px`, height: `330px` }}>
          <img
            style={{ width: `100%`, height: `100%` }}
            src={`PictureForResult/cat${variant}.gif`}
            alt="Cats"
          />
        </div>
      )}
      <Typography variant="h1" sx={{ mt: `50px`, mb: `25px`, fontSize: '24px', fontWeight: '700', color: '#535E6C' }}>
        {text[0]}
      </Typography>
      <Typography variant="h2" sx={{ fontSize: "18px", fontweight: '400', color: '#989CA8' }}>
        {text[1]}
      </Typography>
    </div>
  );
};
export default NoResult;