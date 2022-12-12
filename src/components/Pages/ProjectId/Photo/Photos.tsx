import * as React from "react";
import { useTypedSelector } from "../../../../redusers/useTypedSelector";
import { IProjectPhoto } from "../../../../interfaces/index";
import LoadingPhoto from "./LoadingPhoto";
import Photo from "./Photo";

const Photos: React.FC<{
  photos: IProjectPhoto[];
  removePhoto: (index: number) => void;
}> = ({ photos, removePhoto }) => {

  const load = useTypedSelector((state) => state.projectPhotos.isLoading.add);

  return (
      <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '20px'
      }}>
      {photos.map((photo, index) => (
        <Photo
          key={index}
          photo={photo}
          removePhoto={() => removePhoto(index)}
        />
      ))}
      {load && <LoadingPhoto />}
    </div>
  );
};

export default Photos;