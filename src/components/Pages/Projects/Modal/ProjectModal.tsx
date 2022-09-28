import React, { useEffect, useState } from 'react';
import CustomButtonFixed from '../../../Items/CustomButtonFixed';
import { useAppDispatch, useTypedSelector } from '../../../../redusers/useTypedSelector';
import { Box, Modal, styled, Typography } from '@mui/material';
import ChipSelect from '../../../Items/ChipSelect';
import { projectsActions } from '../../../../actionsTypes/projectsActionTypes';
import { IProject, IProjectPhoto, ITechnology } from '../../../../interfaces';
import PhotoInput from '../../ProjectId/Photo/Photo.Input';
import Photos from '../../ProjectId/Photo/Photos';
import { projectPhotosActions } from '../../../../actionsTypes/projectPhotosActionTypes';
import ModalInput from '../../../Items/ModalInput';
import CloseIcon from "@mui/icons-material/Close";
import '../../../Components.css';
import ModalInputName from './Items/ModalInputName';
import ModalInputCountry from './Items/ModalInputCountry';
import ModalInputLink from './Items/ModalInputLink';
import ModalTypeSelect from './Items/ModalTypeSelect';

interface IProjectModal {
    open: boolean,
    handleClose: () => void,
    editableProject?: IProject
}

const CustomBox = styled(Box)(() => ({
    display: 'flex',
    flexWrap: 'nowrap',
    ['@media (max-width:425px)']: {
        flexWrap: 'wrap'
    }
}))

const ProjectModal: React.FC<IProjectModal> = ({ open, handleClose, editableProject }) => {

    const [projectName, setProjectName] = useState('');
    const [type, setType] = useState('');
    const [country, setCountry] = useState('');
    const [link, setLink] = useState('');
    const [tech, setTech] = useState<Array<ITechnology>>([]);
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState<Array<IProjectPhoto>>([]);

    let url = useTypedSelector((state) => state.projectPhotos.result.add);
    useEffect(() => {
        if (url !== undefined && url !== null) {
            let urlObj: IProjectPhoto = { 'url': url }
            setPhoto(oldArray => [...oldArray, urlObj])
        }
    }, [url]);

    const dispatch = useAppDispatch();
    const addProject = () => {
        const objProject = { 'Name': projectName, 'description': description, 'ProjectTypeId': type, 'country': country, 'link': link, 'technologyList': tech, 'photoList': photo };
        dispatch({ type: projectsActions.ADD_PROJECT_REQUEST, payload: objProject });
        setProjectName('');
        setType('');
        setCountry('');
        setLink('');
        setTech([]);
        setPhoto([]);
        setDescription('');
        handleClose();
    }
    const editProject = () => {
        if (editableProject !== undefined) {
            const objProject = { 'Name': projectName, 'description': description, 'ProjectTypeId': type, 'country': country, 'link': link, 'technologyList': tech, 'photoList': photo };

            dispatch({ type: projectsActions.EDIT_PROJECT_REQUEST, id: editableProject.id, payload: objProject });
            setProjectName('');
            setType('');
            setCountry('');
            setLink('');
            setTech([]);
            setPhoto([]);
            setDescription('');
            handleClose();
        }
    }
    useEffect(() => {
        if (editableProject !== undefined) {
            setProjectName(editableProject.name);
            setType(editableProject.projectTypeId);
            setCountry(editableProject.country);
            setLink(editableProject.link);
            setTech(editableProject.technologyList);
            setPhoto(editableProject.photoList);
            setDescription(editableProject.description);
            handleClose();
        }
    }, [editableProject]);

    const handleChangeName = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        setProjectName(value);
    };

    const handleChangeCountry = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        setCountry(value);
    };
    const handleChangeLink = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (ev.currentTarget.value.includes(" ")) {
            ev.currentTarget.value = ev.currentTarget.value.replace(/\s/g, "");
        }
        const {
            target: { value },
        } = ev;
        setLink(value);
    };
    const handleChangeDescription = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        setDescription(value);
    };

    const removePhotoFromState = (index: number): void => {
        photo && setPhoto([...photo.slice(0, index), ...photo.slice(index + 1)]);

        dispatch({
            type: projectPhotosActions.DEL_PROJECTPHOTO_REQUEST,
            payload: photo[index].id
        });
    };

    const [check, setCheck] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
        (projectName === '' || description === '' || type === ''
            || country === '' || link === ''
        ) && setIsError(true)
    }, [projectName, description, type, country, link]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: 'scroll' }}
        >
            <div className='modalContainerProject'>
                <Box sx={{ m: '50px' }}>
                    {(editableProject === undefined) ? (
                        <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
                            Add Project
                        </Typography>
                    ) : (
                        <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
                            Edit Project
                        </Typography>
                    )}
                    <CloseIcon
                        style={{
                            width: `30px`,
                            position: `absolute`,
                            top: 30,
                            right: 30,
                            color: '#535E6C'
                        }}
                        onClick={handleClose}
                    />
                    <CustomBox>
                        <Box sx={{ mr: '20px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Project name
                            </Typography>
                            <ModalInputName item={projectName}
                                check={check}
                                index={0}
                                setItem={handleChangeName}
                            />
                        </Box>
                        <Box sx={{ mb: '25px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Type
                            </Typography>
                            <ModalTypeSelect type={type} setType={setType} />
                        </Box>
                    </CustomBox>
                    <CustomBox>
                        <Box sx={{ mr: '20px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Country
                            </Typography>
                            <ModalInputCountry item={country}
                                check={check}
                                index={0}
                                setItem={handleChangeCountry}
                            />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Link
                            </Typography>
                            <ModalInputLink
                                item={link}
                                check={check}
                                index={0}
                                setItem={handleChangeLink}
                            />
                        </Box>
                    </CustomBox>
                    <Box sx={{ mb: '18px' }} >
                        <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                            Technologies
                        </Typography>
                        <ChipSelect tech={tech} setTech={setTech} check={check} />
                    </Box>
                    <Box sx={{ mr: '20px', mb: '80px' }}>
                        <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                            Description
                        </Typography>
                        <ModalInput placeholder='Description'
                            item={description}
                            check={check}
                            height={100}
                            index={0}
                            setItem={handleChangeDescription}
                            inputLength={100}
                        />
                    </Box>
                    <Box>
                        <PhotoInput />
                        <Photos photos={photo} removePhoto={removePhotoFromState} />
                    </Box>
                    {(editableProject === undefined) ? (
                        <Box>
                            <CustomButtonFixed variant="contained"
                                children='Add Project'
                                onClick={() => {
                                    if (isError) setCheck(true);
                                    else (addProject())
                                }}
                            />
                        </Box>
                    ) : (
                        <Box>
                            <CustomButtonFixed variant="contained"
                                children='Save Project'
                                onClick={() => {
                                    if (isError) setCheck(true);
                                    else (editProject())
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </div>
        </Modal>
    )
}
export default ProjectModal