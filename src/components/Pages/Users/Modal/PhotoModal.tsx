import { Backdrop, Box, Button, CircularProgress, Modal, Slider } from "@mui/material";
import * as React from "react";
import AvatarEditor from "react-avatar-editor";
import { IPhotoParams } from "../../../../interfaces";
import Dropzone from "react-dropzone";

interface IPhotoUser {
    handleClosePhoto?: () => void;
    openPhoto?: any;
    photo: string | null;
    setPhoto?: any;
    params: IPhotoParams;
    setParams: (arg0: IPhotoParams) => void
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
    params,
    setParams
}) => {

    const [scale, setScale] = React.useState(params.scale);
    const [position, setPosition] = React.useState(params.position);
    const handleChangeScale = (event: Event, newScale: number | number[]) => {
        setScale(newScale as number);
    };

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
                    //@ts-ignore
                    disableHiDPIScaling
                    style={{ transform: `scale(2.5)` }}
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
                        <Slider
                            sx={{ padding: `35px 0 40px 0` }}
                            value={scale}
                            onChange={handleChangeScale}
                            step={0.2}
                            min={1}
                            max={3}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                        />
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