import { Typography } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { projectPhotosActions } from "../../../../actionsTypes/projectPhotosActionTypes";
import '../../../Components.css';

const PhotoInput: React.FC = () => {
  const dispatch = useDispatch();
  const styleInput = {
    display: `none`,
  };

  const uploadImage = (photos: FileList) => {
    Array.from(photos).forEach((payload: File, index: number) => {
      dispatch({
        type: projectPhotosActions.ADD_PROJECTPHOTO_REQUEST,
        payload,
      });
    });
  };

  return (
    <>
      <label className="photoInput">
        <Typography
          variant="subtitle1"
          style={{
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            margin: `0 auto`,
            padding: `25px 0`,
            width: `100%`,
            height: `100%`,
          }}
        >
          Add a photo
        </Typography>
        <input
          type="file"
          multiple
          accept="image/*"
          style={styleInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            uploadImage(e.target.files!)
          }
        />
      </label>
    </>
  );
};

export default PhotoInput;