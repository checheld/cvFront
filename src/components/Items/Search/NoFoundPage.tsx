import { Button, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import ServerError from "../../../Icons/404";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: `150px auto 0 auto`,
      }}
    >
      <ServerError />
      <Typography variant="h1" sx={{ fontSize: `40px`, m: `60px 0 25px 0` }}>
        Ooops!
      </Typography>
      <Typography variant="h2" sx={{ fontSize: `18px`, mb: `35px` }}>
        The page you are looking for doesn't exist
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/cv");
        }}
      >
        Home Page
      </Button>
    </div>
  );
};

export default NotFoundPage;