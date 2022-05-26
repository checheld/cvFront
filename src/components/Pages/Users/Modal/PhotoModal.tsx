import { Backdrop, Box, Button, CircularProgress, Modal, Slider } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import AvatarEditor from "react-avatar-editor";
import CloseIcon from "@mui/icons-material/Close";
import { IPhoto, IPhotoParams } from "../../../../interfaces";
import { useTypedSelector } from "../../../../redusers/useTypedSelector";
import { Suspense, useEffect, useState } from "react";
import Dropzone from "react-dropzone";

interface IPhotoUser {
    handleClosePhoto: () => void;
    openPhoto: any;
    photo: File | null;
    setPhoto: any;
    // params: IPhotoParams;
    // setParams: (arg0: IPhotoParams) => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10, 
    borderRadius: '30px',
    boxShadow: 24,
    p: 4,
    width: `410px`
};

const PhotoModalTemp: React.FC<IPhotoUser> = ({
    handleClosePhoto,
    openPhoto,
    photo,
    setPhoto,
}) => {

    return (
        <Modal
            open={openPhoto}
            onClose={handleClosePhoto}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Box sx={style}>
                <Dropzone
                    onDrop={(dropped) => setPhoto(dropped[0])}
                    noClick
                    noKeyboard
                    //sx={{ width: '250px', height: '250px' }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <AvatarEditor width={250} height={250} image={photo!} />
                            <input {...getInputProps()} />
                        </div>
                    )}
                </Dropzone>
                {photo && (
                    <>
                        <Button variant="contained" onClick={handleClosePhoto}>
                            Save photo
                        </Button>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default PhotoModalTemp;