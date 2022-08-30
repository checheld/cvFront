import { Typography } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { projectPhotosActions } from "../../../../actionsTypes/projectPhotosActionTypes";

interface IPhotoInput {
  width: number
}

const PhotoInput: React.FC<IPhotoInput> = ({ width }) => {
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
      <label style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        width: width,
        height: '100%',
        border: '1px dashed #9EA9BA',
        background: '#FBFBFB',
        marginBottom: '35px'
      }}>
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