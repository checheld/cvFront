import React, { useEffect } from 'react';
import CustomButton from './CustomButton';
import { useAppDispatch, useTypedSelector } from '../redusers/useTypedSelector';
import { Box, Divider, FormControl, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { ICompany, ITechnology, IUniversity } from '../interfaces';
import ChipSelect from './ChipSelect';
import DelInput from '../img/DelInput';

interface IUserModal {
    open: boolean,
    handleClose: () => void,
    editableUser?: any
}
const style = {
    position: 'absolute' as 'absolute',
    top: '90%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10, 
    bgcolor: '#FFFFFF',
    borderRadius: '30px',
    boxShadow: 24,
    p: 4,
};

const UserModal: React.FC<IUserModal> = ({ open, handleClose, editableUser }) => {

    let universities = useTypedSelector((state) => state.universities.universities);
    let companies = useTypedSelector((state) => state.companies.companies);

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const [university, setUniversity] = React.useState('');
    const [speciality, setSpeciality] = React.useState('');
    const [startDateEducation, setStartDateEducation] = React.useState('');
    const [endDateEducation, setEndDateEducation] = React.useState('');
    const [education, setEducation] = React.useState({university: university, speciality: speciality, startDate: startDateEducation, endDate: endDateEducation});
    const [arrayEducation, setArrayEducation] = React.useState([]);

    const [company, setCompany] = React.useState('');
    const [position, setPosition] = React.useState('');
    const [startDateWorkExperience, setStartDateWorkExperience] = React.useState('');
    const [endDateWorkExperience, setEndDateWorkExperience] = React.useState('');
    const [descriptionWorkExperience, setDescriptionWorkExperience] = React.useState('');
    const [workExperience, setWorkExperience] = React.useState({company: company, position: position, startDate: startDateWorkExperience, endDate: endDateWorkExperience, description: descriptionWorkExperience });
    const [arrayWorkExperience, setArrayWorkExperience] = React.useState([]);

    const [tech, setTech] = React.useState([]);
    
    // let isDisabled;
    // if (editableUser === undefined) {
    //     isDisabled = ((projectName !== '') && (type !== '') && (country !== '') && (link !== '') && (tech !== []) && (description !== '')) ? true : false;
    // } else {
    //     isDisabled = ((projectName !== editableProject.name) || (type !== editableProject.type) || (country !== editableProject.country) || (link !== editableProject.link) || (tech !== editableProject.technologyList) || (description !== editableProject.description)) ? true : false;
    // }

    // const dispatch = useAppDispatch();
    // const addProject = () => {
    //     const objProject = { 'Name': projectName, 'description': description, 'Type': type, 'country': country, 'link': link, 'technologyList': tech };
    //     dispatch({ type: projectsActions.ADD_PROJECT_REQUEST, payload: objProject });
    //     setProjectName('');
    //     setType('');
    //     setCountry('');
    //     setLink('');
    //     setTech([]);
    //     setDescription('');
    //     handleClose();
    // }
    // const editProject = () => {
    //     if (editableProject !== undefined) {
    //         const objProject = { 'Name': projectName, 'description': description, 'Type': type, 'country': country, 'link': link, 'technologyList': tech };
    //         dispatch({ type: projectsActions.EDIT_PROJECT_REQUEST, id: editableProject.id, payload: objProject });
    //         setProjectName('');
    //         setType('');
    //         setCountry('');
    //         setLink('');
    //         setTech([]);
    //         setDescription('');
    //         handleClose();
    //     }
    // }
    // useEffect(() => {
    //     if (editableProject !== undefined) {
    //         setProjectName(editableProject.name);
    //         setType(editableProject.type);
    //         setCountry(editableProject.country);
    //         setLink(editableProject.link);
    //         setTech(editableProject.technologyList);
    //         setDescription(editableProject.description);
    //         handleClose();
    //     }
    // }, [editableProject]);

    const handleChangeFirstName = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        setFirstName(value);
    };
    const handleChangeLastName = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        setLastName(value);
    };
    const handleChangeDescription = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        setDescription(value);
    };
    const handleChangeUniversity = (event: SelectChangeEvent) => {
        setUniversity(event.target.value);
    };
    const handleChangeSpeciality = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        setSpeciality(value);
    };
    const handleChangeStartDateEducation = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        setStartDateEducation(value);
    };
    const handleChangeEndDateEducation = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        setEndDateEducation(value);
    };

    const removeEducation = (index: number): void => {
        setArrayEducation([...arrayEducation.slice(0, index), ...arrayEducation.slice(index + 1)]);
    };
    // const handleAddEducation = () =>
    //     setArrayEducation([...arrayEducation, education])
    // ;

    const handleChangeCompany = (event: SelectChangeEvent) => {
        setCompany(event.target.value);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: 'scroll' }}
        >
            <Box sx={style}>
                <Box sx={{ m: '50px' }}>
                    {(editableUser === undefined) ? (
                        <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
                            Add Users
                        </Typography>
                    ) : (
                        <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
                            Edit Users
                        </Typography>
                    )}
                    <Box>
                        <Box sx={{ mr: '20px', mb: '25px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                First name
                            </Typography>
                            <OutlinedInput placeholder='First name'
                                value={firstName}
                                id="input"
                                sx={{ width: '700px', mb: '0px', height: '50px' }}
                                onChange={handleChangeFirstName}
                            />
                        </Box>
                        <Box sx={{ mr: '20px', mb: '25px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Last name
                            </Typography>
                            <OutlinedInput placeholder='Last name'
                                value={lastName}
                                id="input"
                                sx={{ width: '700px', mb: '0px', height: '50px' }}
                                onChange={handleChangeLastName}
                            />
                        </Box>
                        <Box sx={{ mr: '20px', mb: '40px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Description
                            </Typography>
                            <OutlinedInput placeholder='Description'
                                value={description}
                                id="input"
                                sx={{ width: '700px', mb: '0px', height: '100px' }}
                                onChange={handleChangeDescription}
                            />
                        </Box>
                        <Divider variant="inset" sx={{ border: '1px solid #E3E3EA', mb: '40px', width: '700px', ml: 0}} />
                        <Box>
                            <Typography sx={{ fontSize: '16px', color: '#535E6C', fontWeight: 600, mb: '15px' }}>
                                EDUCATION
                            </Typography>
                            {/* {arrayEducation.length && arrayEducation.map((education, index) => (
                                <Box sx={{m:0, p:0}} key={index}>
                                     {index > 0 && (
                                        <Box sx={{ position: `relative`, left: `-35px`, top: `40px` }}>
                                            <DelInput index={index} removeItem={removeEducation} />
                                        </Box>
                                    )} */}
                                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                        University
                                    </Typography>
                                    <FormControl>
                                        <Select
                                            value={university}
                                            onChange={handleChangeUniversity}
                                            defaultValue={""}
                                            sx={{ width: '700px', height: '50px', mb: '20px' }}
                                            displayEmpty
                                        >
                                            <MenuItem value="">
                                                <em>Select university</em>
                                            </MenuItem>
                                            {
                                                universities.map((uni: IUniversity) => <MenuItem value={uni.name}>{uni.name}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                    <Box sx={{display: 'flex', mb: '25px'}}>
                                        <Box sx={{ mr: '20px' }}>
                                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                                Speciality
                                            </Typography>
                                            <OutlinedInput placeholder='Speciality'
                                                value={speciality}
                                                id="input"
                                                sx={{ width: '410px', mb: '0px', height: '50px' }}
                                                onChange={handleChangeSpeciality}
                                            />
                                        </Box>
                                        <Box sx={{ mr: '20px' }}>
                                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                                Start date - End date
                                            </Typography>
                                            <Box sx={{display:'flex'}}>
                                                <TextField
                                                    id="date"
                                                    label="Start date"
                                                    type="date"
                                                    defaultValue="2022-05-26"
                                                    sx={{ width: '130px', mr: '10px' }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    value={startDateEducation}
                                                    onChange={handleChangeStartDateEducation}
                                                />
                                                <TextField
                                                    id="date"
                                                    label="End date"
                                                    type="date"
                                                    defaultValue="2022-05-26"
                                                    sx={{ width: '130px' }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    value={endDateEducation}
                                                    onChange={handleChangeEndDateEducation}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                {/* </Box>
                            ))} */}
                            <Box sx={{ mb: '35px' }}>
                                <CustomButton variant="outlined"
                                    children='+ Add Education'
                                    // onClick={handleAddEducation}
                                />
                            </Box>
                        </Box>
                        <Divider variant="inset" sx={{ border: '1px solid #E3E3EA', mb: '40px', width: '700px', ml: 0}} />
                        <Box>
                            <Typography sx={{ fontSize: '16px', color: '#535E6C', fontWeight: 600, mb: '15px' }}>
                                WORK EXPERIENCE
                            </Typography>
                            <Box sx={{display: 'flex'}}>
                                <Box sx={{mr: '20px'}}>
                                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                        Company name
                                    </Typography>
                                    <FormControl>
                                        <Select
                                            value={company}
                                            onChange={handleChangeCompany}
                                            defaultValue={""}
                                            sx={{ width: '195px', height: '50px', mb: '20px' }}
                                            displayEmpty
                                        >
                                            <MenuItem value="">
                                                <em>Select company</em>
                                            </MenuItem>
                                            {
                                                companies.map((comp: ICompany) => <MenuItem value={comp.name}>{comp.name}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{ mr: '20px' }}>
                                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                        Position
                                    </Typography>
                                    <OutlinedInput placeholder='Position'
                                        value={position}
                                        id="input"
                                        sx={{ width: '195px', mb: '0px', height: '50px' }}
                                        // onChange={handleChangePosition}
                                    />
                                </Box>
                                <Box sx={{ mr: '20px' }}>
                                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                        Start date - End date
                                    </Typography>
                                    <Box sx={{display:'flex'}}>
                                        <TextField
                                            id="date"
                                            label="Start date"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            sx={{ width: '130px', mr: '10px' }}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                        />
                                        <TextField
                                            id="date"
                                            label="End date"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            sx={{ width: '130px' }}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box> 
                            <Box sx={{ mr: '20px', mb: '25px' }}>
                                <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                    Description
                                </Typography>
                                <OutlinedInput placeholder='Description'
                                    value={description}
                                    id="input"
                                    sx={{ width: '700px', mb: '0px', height: '100px' }}
                                    // onChange={handleChangeDescription}
                                />
                            </Box>
                            <Box sx={{ mb: '35px' }}>
                                <CustomButton variant="outlined"
                                    children='+ Add Company'
                                    // onClick={handleAddCompany}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Divider variant="inset" sx={{ border: '1px solid #E3E3EA', mb: '40px', width: '700px', ml: 0}} />
                    <Typography sx={{ fontSize: '16px', color: '#535E6C', fontWeight: 600, mb: '15px' }}>
                        TECHNOLOGIES
                    </Typography>
                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                        Skills
                    </Typography>
                    <ChipSelect tech={tech} setTech={setTech}/>
                    {(editableUser === undefined) ? (
                        <Box  sx={{mt: '15px'}}>
                            <CustomButton variant="contained"
                                // onClick={addUser}
                                children='Add Technology'
                                // disabled={!isDisabled}
                            />
                        </Box>
                    ) : (
                            <Box  sx={{mt: '15px'}}>
                                <CustomButton variant="contained"
                                    // onClick={editUser}
                                    children='Save Technology'
                                    // disabled={!isDisabled}
                                />
                            </Box>
                    )}
                </Box>
            </Box>
        </Modal>
    )
}
export default UserModal