import React, { useEffect } from 'react';
import CustomButton from '../../../Items/CustomButton';
import { useAppDispatch, useTypedSelector } from '../../../../redusers/useTypedSelector';
import { Box, FormControl, FormHelperText, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, Typography, useFormControl } from '@mui/material';
import ChipSelect from '../../../Items/ChipSelect';
import { projectsActions } from '../../../../actionsTypes/projectsActionTypes';
import { IProject, IProjectPhoto, ITechnology } from '../../../../interfaces';
import PhotoInput from '../../ProjectId/Photo/Photo.Input';
import Photos from '../../ProjectId/Photo/Photos';
import { projectPhotosActions } from '../../../../actionsTypes/projectPhotosActionTypes';
import ModalInput from '../../../Items/ModalInput';

interface IProjectModal {
    open: boolean,
    handleClose: () => void,
    editableProject?: IProject
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#FFFFFF',
    borderRadius: '30px',
    boxShadow: 24,
    p: 4,
};

const ProjectModal: React.FC<IProjectModal> = ({ open, handleClose, editableProject }) => {

    const [projectName, setProjectName] = React.useState('');
    const [type, setType] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [link, setLink] = React.useState('');
    const [tech, setTech] = React.useState<Array<ITechnology>>([]);
    const [description, setDescription] = React.useState('');
    const [photo, setPhoto] = React.useState<Array<IProjectPhoto>>([]);

    let projectTypes = useTypedSelector((state) => state.projectTypes.projectTypes);

    let url = useTypedSelector((state) => state.projectPhotos.result.add);
    useEffect(() => {
        if (url !== undefined && url !== null) {
            let urlObj: IProjectPhoto = { 'url': url }
            setPhoto(oldArray => [...oldArray, urlObj])
        }
    }, [url]);

    function MyFormHelperText() {
        const { focused } = useFormControl() || {};

        const helperText: string = React.useMemo(() => {
            if (!type && check) {
                return 'Empty field';
            }
            return '';
        }, [focused]);

        return <FormHelperText sx={{ color: 'red' }}>{helperText}</FormHelperText>;
    }

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
    const handleChangeType = (event: SelectChangeEvent) => {
        setType(event.target.value);
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

    const [check, setCheck] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        setIsError(false);
        (projectName === '' || description === '' || type === ''
            || country === '' || link === '' || tech === []
        ) && setIsError(true)
    }, [projectName, description, type, country, link, tech]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{ m: '30px' }}>
                    {(editableProject === undefined) ? (
                        <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
                            Add Project
                        </Typography>
                    ) : (
                        <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
                            Edit Project
                        </Typography>
                    )}
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ mr: '20px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Project name
                            </Typography>
                            <ModalInput placeholder='Project name'
                                item={projectName}
                                check={check}
                                width={450}
                                index={0}
                                setItem={handleChangeName}
                            />
                        </Box>
                        <Box sx={{ mb: '20px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Type
                            </Typography>
                            <FormControl>
                                <Select
                                    value={type}
                                    onChange={handleChangeType}
                                    defaultValue={""}
                                    error={!type && check}
                                    sx={{ width: '230px', height: '45px', mb: 0 }}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        <span style={{ color: `#a7aaac`, fontSize: `14px` }}>
                                            Select type
                                        </span>
                                    </MenuItem>
                                    {
                                        projectTypes.map((x) => <MenuItem value={x.id}>{x.name}</MenuItem>)
                                    }
                                </Select>
                                <MyFormHelperText />
                            </FormControl>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ mr: '20px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Country
                            </Typography>
                            <ModalInput placeholder='Country'
                                item={country}
                                check={check}
                                width={250}
                                index={0}
                                setItem={handleChangeCountry}
                            />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Link
                            </Typography>
                            <ModalInput placeholder='Link'
                                item={link}
                                check={check}
                                width={430}
                                index={0}
                                setItem={handleChangeLink}
                            />
                        </Box>
                    </Box>
                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                        Technologies
                    </Typography>
                    <ChipSelect tech={tech} setTech={setTech} check={check} />
                    <Box sx={{ mr: '20px', mb: '80px' }}>
                        <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                            Description
                        </Typography>
                        <ModalInput placeholder='Description'
                            item={description}
                            check={check}
                            width={700}
                            height={100}
                            index={0}
                            setItem={handleChangeDescription}
                        />
                    </Box>
                    <Box>
                        <PhotoInput />
                        <Photos photos={photo} removePhoto={removePhotoFromState} />
                    </Box>
                    {(editableProject === undefined) ? (
                        <Box>
                            <CustomButton variant="contained"
                                children='Add Project'
                                onClick={() => {
                                    if (isError) setCheck(true);
                                    else (addProject())
                                }}
                            />
                        </Box>
                    ) : (
                        <Box>
                            <CustomButton variant="contained"
                                children='Save Project'
                                onClick={() => {
                                    if (isError) setCheck(true);
                                    else (editProject())
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Modal>
    )
}
export default ProjectModal