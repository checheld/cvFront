import React, { useEffect, useState } from 'react';
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
import CloseIcon from "@mui/icons-material/Close";
import '../../../Components.css';

interface IProjectModal {
    open: boolean,
    handleClose: () => void,
    editableProject?: IProject
}

const ProjectModal: React.FC<IProjectModal> = ({ open, handleClose, editableProject }) => {

    const [projectName, setProjectName] = useState('');
    const [type, setType] = useState('');
    const [country, setCountry] = useState('');
    const [link, setLink] = useState('');
    const [tech, setTech] = useState<Array<ITechnology>>([]);
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState<Array<IProjectPhoto>>([]);

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

    const [check, setCheck] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
        (projectName === '' || description === '' || type === ''
            || country === '' || link === '' || tech === []
        ) && setIsError(true)
    }, [projectName, description, type, country, link, tech]);

    const screenWidth = window.screen.width;
    const [inputWidthBig, setInputWidthBig] = useState<number>();
    const [inputWidthMiddle, setInputWidthMiddle] = useState<number>();
    const [inputWidthSmall, setInputWidthSmall] = useState<number>();
    const [wrap, setWrap] = useState<string>();
    useEffect(() => {
        if (screenWidth <= 1024 && screenWidth > 425) {
            setInputWidthBig(505)
            setInputWidthMiddle(300)
            setInputWidthSmall(185)
            setWrap('nowrap')
        } else if (screenWidth < 426) {
            setInputWidthBig(300)
            setInputWidthMiddle(300)
            setInputWidthSmall(300)
            setWrap('wrap')
        } else {
            setInputWidthBig(700)
            setInputWidthMiddle(450)
            setInputWidthSmall(230)
            setWrap('nowrap')
        }
    }, [screenWidth]);

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
                    <Box sx={{ display: 'flex', flexWrap: wrap! }}>
                        <Box sx={{ mr: '20px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Project name
                            </Typography>
                            <ModalInput placeholder='Project name'
                                item={projectName}
                                check={check}
                                width={inputWidthMiddle}
                                index={0}
                                setItem={handleChangeName}
                                inputLength={15}
                            />
                        </Box>
                        <Box sx={{ mb: '25px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Type
                            </Typography>
                            <FormControl>
                                <Select
                                    value={type}
                                    onChange={handleChangeType}
                                    defaultValue={""}
                                    error={!type && check}
                                    sx={{ width: inputWidthSmall, height: '50px', mb: 0 }}
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
                    <Box sx={{ display: 'flex', flexWrap: wrap! }}>
                        <Box sx={{ mr: '20px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Country
                            </Typography>
                            <ModalInput placeholder='Country'
                                item={country}
                                check={check}
                                width={inputWidthSmall}
                                index={0}
                                setItem={handleChangeCountry}
                                inputLength={15}
                            />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Link
                            </Typography>
                            <ModalInput placeholder='Link'
                                item={link}
                                check={check}
                                width={inputWidthMiddle}
                                index={0}
                                setItem={handleChangeLink}
                                inputLength={30}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ mb: '18px' }} >
                        <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                            Technologies
                        </Typography>
                        <ChipSelect tech={tech} setTech={setTech} check={check} width={inputWidthBig!} />
                    </Box>
                    <Box sx={{ mr: '20px', mb: '80px' }}>
                        <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                            Description
                        </Typography>
                        <ModalInput placeholder='Description'
                            item={description}
                            check={check}
                            width={inputWidthBig}
                            height={100}
                            index={0}
                            setItem={handleChangeDescription}
                            inputLength={100}
                        />
                    </Box>
                    <Box>
                        <PhotoInput width={inputWidthBig!} />
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
            </div>
        </Modal>
    )
}
export default ProjectModal