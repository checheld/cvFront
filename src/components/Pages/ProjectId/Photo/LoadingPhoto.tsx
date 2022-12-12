import * as React from "react";
import {  CircularProgress } from "@mui/material";

const LoadingPhoto: React.FC = () => {
  return (
    <div style={{
      display: 'grid',
      position: 'relative',
      gap: '5px 15px',
      justifyContent: 'center',
      width: '70px',
      border: '1px solid #E3E3EA',
      borderRadius: '5px',
      backgroundColor: '#fff',
      padding: '20px 10px'
    }}>
        <CircularProgress />
    </div>
  );
};

export default LoadingPhoto;