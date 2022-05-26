import { Backdrop, Box, Button, CircularProgress, Modal, Slider } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import AvatarEditor from "react-avatar-editor";
import CloseIcon from "@mui/icons-material/Close";
import { IPhoto, IPhotoParams } from "../../../../interfaces";
import { useTypedSelector } from "../../../../redusers/useTypedSelector";
import { Suspense, useEffect } from "react";

interface IPhotoUser {
    handleClosePhoto: () => void;
    openPhoto: any;
    photo: File | null;
    setPhoto: any;
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
    const [modalPhoto, setModalPhoto] = React.useState<IPhoto>();
    const [photoURL, setPhotoURL] = React.useState<any>();
    console.log(photoURL)
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
                <div
                    style={{
                        background: `#F0F2F5`,
                        borderRadius: `15px`,
                        height: `375px`,
                        margin: `0 auto`,
                        padding: `37px 0`,
                        position: `relative`,
                    }}
                >
                    <label
                        style={{
                            display: `flex`,
                            justifyContent: `center`,
                            alignItems: `center`,
                            cursor: `pointer`,
                            width: `100%`,
                            height: `100%`,
                            marginBottom: `0`,
                        }}
                    >
                        {photoURL ? (
                            <>
                                <Suspense fallback={<CircularProgress size={100} />}>
                                    <AvatarEditor
                                        image={photoURL}
                                        width={100}
                                        height={100}
                                        border={0}
                                        color={[240, 242, 245, 1]}
                                        scale={scale}
                                        position={position}
                                        onPositionChange={(e: any) => setPosition(e)}
                                        borderRadius={49}
                                        //@ts-ignore
                                        disableHiDPIScaling
                                        style={{ transform: `scale(2.5)` }}
                                    />
                                    <CloseIcon
                                        style={{
                                            width: `30px`,
                                            position: `absolute`,
                                            top: 10,
                                            right: 10,
                                        }}
                                        onClick={setPhoto}
                                    />
                                </Suspense>
                            </>
                        // ) : !photoURL.url ? (
                        //     <CircularProgress size={100} />
                        ) : (
                            <AddIcon
                                style={{ width: `100px`, height: `100px`, color: `grey` }}
                            />
                        )}
                        <input
                            style={{ display: `none` }}
                            type="file"
                            accept="image/*"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setPhotoURL(e.target.files!);
                            }}
                        />
                    </label>
                </div>
                {photoURL && (
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
                        <Button variant="contained" onClick={setPhoto}>
                            Save photo
                        </Button>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default PhotoModalTemp;