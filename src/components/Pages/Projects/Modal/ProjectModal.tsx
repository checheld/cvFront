import React, { useEffect } from 'react';
import CustomButton from '../../../Items/CustomButton';
import { useAppDispatch } from '../../../../redusers/useTypedSelector';
import { Box, FormControl, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, Typography } from '@mui/material';
import ChipSelect from '../../../Items/ChipSelect';
import { projectsActions } from '../../../../actionsTypes/projectsActionTypes';
import { IProject, ITechnology } from '../../../../interfaces';

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
    const items = ['CRM', 'Web service', 'Web site'];
    let isDisabled;
    if (editableProject === undefined) {
        isDisabled = ((projectName !== '') && (type !== '') && (country !== '') && (link !== '') && (tech !== []) && (description !== '')) ? true : false;
    } else {
        isDisabled = ((projectName !== editableProject.name) || (type !== editableProject.type) || (country !== editableProject.country) || (link !== editableProject.link) || (tech !== editableProject.technologyList) || (description !== editableProject.description)) ? true : false;
    }

    const dispatch = useAppDispatch();
    const addProject = () => {
        const objProject = { 'Name': projectName, 'description': description, 'Type': type, 'country': country, 'link': link, 'technologyList': tech };
        dispatch({ type: projectsActions.ADD_PROJECT_REQUEST, payload: objProject });
        setProjectName('');
        setType('');
        setCountry('');
        setLink('');
        setTech([]);
        setDescription('');
        handleClose();
    }
    const editProject = () => {
        if (editableProject !== undefined) {
            const objProject = { 'Name': projectName, 'description': description, 'Type': type, 'country': country, 'link': link, 'technologyList': tech };
            dispatch({ type: projectsActions.EDIT_PROJECT_REQUEST, id: editableProject.id, payload: objProject });
            setProjectName('');
            setType('');
            setCountry('');
            setLink('');
            setTech([]);
            setDescription('');
            handleClose();
        }
    }
    useEffect(() => {
        if (editableProject !== undefined) {
            setProjectName(editableProject.name);
            setType(editableProject.type);
            setCountry(editableProject.country);
            setLink(editableProject.link);
            setTech(editableProject.technologyList);
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
                            <OutlinedInput placeholder='Project name'
                                value={projectName}
                                id="input"
                                sx={{ width: '450px', mb: '0px', height: '45px' }}
                                onChange={handleChangeName}
                            />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Type
                            </Typography>
                            <FormControl>
                                <Select
                                    value={type}
                                    onChange={handleChangeType}
                                    defaultValue={""}
                                    sx={{ width: '230px', height: '45px', mb: '20px' }}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        <em>Select type</em>
                                    </MenuItem>
                                    {
                                        items.map((x) => <MenuItem value={x}>{x}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ mr: '20px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Country
                            </Typography>
                            <OutlinedInput placeholder='Country'
                                value={country}
                                id="input"
                                sx={{ width: '250px', mb: '0px', height: '45px' }}
                                onChange={handleChangeCountry}
                            />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Link
                            </Typography>
                            <OutlinedInput placeholder='Link'
                                value={link}
                                id="input"
                                sx={{ width: '430px', mb: '0px', height: '45px' }}
                                onChange={handleChangeLink}
                            />
                        </Box>
                    </Box>
                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px', mt: '25px' }}>
                        Technologies
                    </Typography>
                    <ChipSelect tech={tech} setTech={setTech} />
                    <Box sx={{ mr: '20px' }}>
                        <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                            Description
                        </Typography>
                        <OutlinedInput placeholder='Description'
                            value={description}
                            id="input"
                            sx={{ width: '700px', mb: '35px', height: '100px' }}
                            onChange={handleChangeDescription}
                        />
                    </Box>
                    {(editableProject === undefined) ? (
                        <Box>
                            <CustomButton variant="contained" onClick={addProject} children='Add Technology' disabled={!isDisabled} />
                        </Box>
                    ) : (
                        <Box>
                            <CustomButton variant="contained" onClick={editProject} children='Save Technology' disabled={!isDisabled} />
                        </Box>
                    )}
                </Box>
            </Box>
        </Modal>
    )
}
export default ProjectModal