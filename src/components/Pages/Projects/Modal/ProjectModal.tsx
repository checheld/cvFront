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
    ['@media (max-width:426px)']: {
        flexWrap: 'wrap'
    }
}))

const ProjectModal: React.FC<IProjectModal> = ({ open, handleClose, editableProject }) => {

    const [projectName, setProjectName] = useState('');
    const [type, setType] = useState({'id': 0});
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
        const objProject = { 'name': projectName, 'description': description, 'projectType': type, 'country': country, 'link': link, 'technologies': tech, 'photoList': photo };
        dispatch({ type: projectsActions.ADD_PROJECT_REQUEST, payload: objProject });
        setProjectName('');
        setType({'id': 0});
        setCountry('');
        setLink('');
        setTech([]);
        setPhoto([]);
        setDescription('');
        handleClose();
    }
    const editProject = () => {
        if (editableProject !== undefined) {
            const photoWithProjId = photo.map(p => ({...p, 'project': {'id': editableProject.id}}))
            const objProject = { id: editableProject.id, 'name': projectName, 'description': description, 'projectType': type, 'country': country, 'link': link, 'technologies': tech, 'photoList': photoWithProjId };

            dispatch({ type: projectsActions.EDIT_PROJECT_REQUEST, id: editableProject.id, project: objProject });
            setProjectName('');
            setType({'id': 0});
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
            setType(editableProject.projectType);
            setCountry(editableProject.country);
            setLink(editableProject.link);
            setTech(editableProject.technologies);
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
    };

    const [check, setCheck] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
        (projectName === '' || description === '' || type.id ===  0
            || country === '' || link === ''
        ) && setIsError(true)
    }, [projectName, description, type, country, link]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div className='modal'>
                <Box sx={{ m: '10px' }}>
                    {(editableProject === undefined) ? (
                        <Typography className='mainModalName'>
                            Add Project
                        </Typography>
                    ) : (
                        <Typography className='mainModalName'>
                            Edit Project
                        </Typography>
                    )}
                    <CloseIcon
                        className='closeIcon'
                        onClick={handleClose}
                    />
                    <Box className='scrollContainer'>
                        <CustomBox>
                            <Box sx={{ mr: '20px' }}>
                                <Typography className='inputTitle'>
                                    Project name
                                </Typography>
                                <ModalInputName item={projectName}
                                    check={check}
                                    index={0}
                                    setItem={handleChangeName}
                                />
                            </Box>
                            <Box sx={{ mb: '25px' }}>
                                <Typography className='inputTitle'>
                                    Type
                                </Typography>
                                <ModalTypeSelect type={type.id} setType={setType} />
                            </Box>
                        </CustomBox>
                        <CustomBox>
                            <Box sx={{ mr: '20px' }}>
                                <Typography className='inputTitle'>
                                    Country
                                </Typography>
                                <ModalInputCountry item={country}
                                    check={check}
                                    index={0}
                                    setItem={handleChangeCountry}
                                />
                            </Box>
                            <Box>
                                <Typography className='inputTitle'>
                                    Link
                                </Typography>
                                <ModalInputLink
                                    item={link}
                                    index={0}
                                    setItem={handleChangeLink}
                                />
                            </Box>
                        </CustomBox>
                        <Box sx={{ mb: '18px' }} >
                            <Typography className='inputTitle'>
                                Technologies
                            </Typography>
                            <ChipSelect tech={tech} setTech={setTech} check={check} />
                        </Box>
                        <Box sx={{ mr: '20px', mb: '80px' }}>
                            <Typography className='inputTitle'>
                                Description
                            </Typography>
                            <ModalInput placeholder='Description'
                                item={description}
                                check={check}
                                height={100}
                                index={0}
                                setItem={handleChangeDescription}
                                inputLength={500}
                            />
                        </Box>
                        <Box>
                            <PhotoInput />
                            <Photos photos={photo} removePhoto={removePhotoFromState} />
                        </Box>
                    </Box>
                    {(editableProject === undefined) ? (
                        <Box sx={{ m: '30px 0 20px 40px' }}>
                            <CustomButtonFixed variant="contained"
                                children='Add Project'
                                onClick={() => {
                                    if (isError) setCheck(true);
                                    else (addProject())
                                }}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ m: '30px 0 20px 40px' }}>
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