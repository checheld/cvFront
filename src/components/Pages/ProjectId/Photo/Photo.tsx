import {  Typography } from "@mui/material";
import * as React from "react";
import { IProjectPhoto } from "../../../../interfaces/index";
import ImageIcon from "@mui/icons-material/Image";

const Photo: React.FC<{
  photo: IProjectPhoto;
  removePhoto: () => void;
}> = ({ photo, removePhoto }) => {
  return (
    <div style={{
      display: 'grid',
      position: 'relative',
      gridTemplateColumns: '1fr 5fr',
      gap: '5px 15px',
      justifyContent: 'center',
      width: '10%',
      border: '1px solid #E3E3EA',
      borderRadius: '5px',
      backgroundColor: '#fff',
      padding: '10px'
    }}>
      <div
        style={{
          display: `inline-block`,
          width: `50px`,
          height: `50px`,
          borderRadius: `5px`,
          overflow: `hidden`,
          scale: `0 !important`,
          gridRow: `1/3`,
        }}
      >
        {photo.url ? (
          <img
            src={photo.url}
            style={{ width: `100%`, height: `100%` }}
            alt="photo"
          />
        ) : (
          <ImageIcon
            style={{ width: `100%`, height: `100%`, color: `#535E6C` }}
          />
        )}
      </div>
      <Typography
            onClick={removePhoto}
            variant="h6"
            sx={{
              position: `absolute`,
              mb: 0,
              top: `10px`,
              right: `10px`,
              cursor: `pointer`,
              fontSize: '12px'
            }}
          >
            X
          </Typography>
          {/* <div
            style={{
              width: `90%`,
              height: `5px`,
              backgroundColor: `#535E6C`,
              borderRadius: `10px`,
              gridRow: `2/3`,
              gridColumn: `2/3`,
            }}
          />
          <Typography
            onClick={removePhoto}
            variant="h3"
            sx={{
              position: `absolute`,
              mb: 0,
              top: `10px`,
              right: `10px`,
              cursor: `pointer`,
            }}
          >
            X
          </Typography> */}
    </div>
  );
};

export default Photo;