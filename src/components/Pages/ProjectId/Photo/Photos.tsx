import * as React from "react";
import { IProjectPhoto } from "../../../../interfaces/index";
import Photo from "./Photo";

const Photos: React.FC<{
  photos: IProjectPhoto[];
  removePhoto: (index: number) => void;
}> = ({ photos, removePhoto }) => {
  return (
      <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '700px',
          gap: '20px',
          marginBottom: '20px'
      }}>
      {photos.map((photo, index) => (
        <Photo
          photo={photo}
          removePhoto={() => removePhoto(index)}
        />
      ))}
    </div>
  );
};

export default Photos;