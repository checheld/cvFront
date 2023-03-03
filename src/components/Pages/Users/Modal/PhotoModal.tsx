import { Backdrop, Box, Button, CircularProgress, Modal, Slider } from "@mui/material";
import React, { FC, useEffect, useState } from 'react';
import AddIcon from "@mui/icons-material/Add";
import AvatarEditor from "react-avatar-editor";
import { IPhotoParams } from "../../../../interfaces";
import { Suspense } from "react";
import { userPhotosActions } from "../../../../actionsTypes/userPhotosActionTypes";
import { useAppDispatch } from "../../../../redusers/useTypedSelector";
import CloseIcon from "@mui/icons-material/Close";

interface IPhotoUser {
    handleClosePhoto: () => void;
    handleOpenPhotoModal: any;
    openPhoto: any;
    photo: string | null;
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

const PhotoModal: FC<IPhotoUser> = ({
    handleClosePhoto,
    handleOpenPhotoModal,
    openPhoto,
    photo,
    params,
    setParams
}) => {
    const dispatch = useAppDispatch();
    const [scale, setScale] = useState(params.scale);
    const [position, setPosition] = useState(params.position);
    const handleChangeScale = (event: Event, newScale: number | number[]) => {
        setScale(newScale as number);
    };

    const handleChangePosition = (e: any): void => {
        params.position.id ? setPosition({...e, id: params.position.id}) : setPosition(e)
    };

    useEffect(() => {
        params.id ? setParams({ id: params.id, scale: scale, position: position }) : setParams({ scale: scale, position: position })
    }, [scale, position]);

    const uploadImage = (photos: FileList) => {
        Array.from(photos).forEach((photo: File, index: number) => {
            dispatch({ type: userPhotosActions.ADD_USERPHOTO_REQUEST, payload: photo });
        });
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
                <div
                    style={{
                        background: `#F0F2F5`,
                        borderRadius: `15px`,
                        height: `450px`,
                        margin: `0 auto`,
                        padding: `37px 0`,
                        position: `relative`,
                    }}
                >
                    <label
                        style={{
                            display: `flex`,
                            justifyContent: `center`,
                            cursor: `pointer`,
                            width: `100%`,
                            height: `100%`,
                            marginBottom: `0`,
                            marginTop: '110px',
                        }}
                    >
                        {photo ? (
                            <>
                                <Suspense fallback={<CircularProgress size={100} />}>
                                    <AvatarEditor
                                        image={photo}
                                        width={100}
                                        height={100}
                                        border={0}
                                        color={[240, 242, 245, 1]}
                                        scale={scale}
                                        position={position}
                                        onPositionChange={handleChangePosition}
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
                                            cursor: 'pointer'

                                        }}
                                        onClick={handleOpenPhotoModal}
                                    />
                                </Suspense>
                            </>
                        ) : (
                            <AddIcon
                                style={{ width: `100px`, height: `100px`, color: `grey`, marginTop: '50px' }}
                            />
                        )}
                        <input
                            style={{ display: `none` }}
                            type="file"
                            accept="image/*"
                            disabled={!!photo}
                            multiple
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                                uploadImage(e.target.files!);
                            }}
                        />
                    </label>
                    {photo && (
                        <>
                            <Slider
                                sx={{ padding: `35px 0 40px 0`, position: 'absolute', width: '80%', top: '70%', left: '10%' }}
                                value={scale}
                                onChange={handleChangeScale}
                                step={0.2}
                                min={1}
                                max={3}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                            />
                            <Button
                                variant="contained" onClick={handleClosePhoto}
                                sx={{ position: 'absolute', top: '87%', left: '10%' }}>
                                Save photo
                            </Button>
                        </>
                    )}
                </div>

            </Box>
        </Modal>
    );
};

export default PhotoModal;