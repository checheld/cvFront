import React, { useEffect } from 'react';
import CustomButton from '../../../Items/CustomButton';
import { useAppDispatch, useTypedSelector } from '../../../../redusers/useTypedSelector';
import { Backdrop, Box, Divider, FormControl, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { ICompany, IEducation, IPhotoParams, ITechnology, IUniversity, IUser, IWorkExperience } from '../../../../interfaces';
import ChipSelect from '../../../Items/ChipSelect'; 
import DelInput from '../../../../img/DelInput';
import { usersActions } from '../../../../actionsTypes/usersActionTypes';
import { userPhotosActions } from '../../../../actionsTypes/userPhotosActionTypes';
import Photo from '../Items/Photo';
import PhotoModal from './PhotoModal';
import PhotoModalTemp from './PhotoModalTemp';

interface IUserModal {
    open: boolean,
    handleClose: () => void,
    editableUser?: IUser,
}
const style = {
    position: 'absolute' as 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10, 
    bgcolor: '#FFFFFF',
    borderRadius: '30px',
    boxShadow: 24,
    p: 4,
};

const UserModal: React.FC<IUserModal> = ({ open, handleClose, editableUser }) => {

    const initialParams: IPhotoParams = {
        scale: 1,
        position: {
            x: 0.5,
            y: 0.5,
        },
    };

    let universities = useTypedSelector((state) => state.universities.universities);
    let companies = useTypedSelector((state) => state.companies.companies);
    let url = useTypedSelector((state) => state.userPhotos.result.add);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [education, setEducation] = React.useState({universityId: '', speciality: '', startDate: '', endDate: ''});
    const [arrayEducation, setArrayEducation] = React.useState<IEducation[]>([education]); 
    const [workExperience, setWorkExperience] = React.useState({companyId: '', position: '', startDate: '', endDate: '', description: ''});
    const [arrayWorkExperience, setArrayWorkExperience] = React.useState<IWorkExperience[]>([workExperience]);
    const [tech, setTech] = React.useState<ITechnology[]>([]);
    const [openPhoto, setOpenPhoto] = React.useState(false);
    const handleOpenPhoto = () => setOpenPhoto(true);
    const handleClosePhoto = () => {
        if(photo !== null) {
            dispatch({ type: userPhotosActions.ADD_USERPHOTO_REQUEST, payload: photo });
        }
        setOpenPhoto(false)
    };
    const [params, setParams] = React.useState(initialParams);
    const [photo, setPhoto] = React.useState<string | null>(url);

    // React.useEffect(() => {
    //   setPhoto({ ...photo, params });
    // }, [params]);
    // React.useEffect(() => {
    //   props.user.photo.params
    //     ? setParams(props.user.photo.params)
    //     : setParams(initialParams);
    // }, [props.user.photo.params]);
    let isDisabled;
    if (editableUser === undefined) {
        isDisabled = ((firstName !== '') && (lastName !== '') && (description !== '') ) ? true : false;
    } 
    else {
        isDisabled = true;
        // isDisabled = ((firstName !== editableUser.firstName) || (lastName !== editableUser.lastName) || (description !== editableUser.description)) ? true : false;
    }

    const dispatch = useAppDispatch();
    const addUser = () => {
        const objUser = { 'firstName': firstName, 'lastName': lastName, 'description': description, 'educationList': arrayEducation, 'workExperienceList': arrayWorkExperience, 'technologyList': tech, 'photoUrl': url };
        dispatch({ type: usersActions.ADD_USER_REQUEST, payload: objUser });
        setFirstName('');
        setLastName('');
        setDescription('');
        setEducation({universityId: '', speciality: '', startDate: '', endDate: ''});
        setArrayEducation([]);
        setWorkExperience({companyId: '', position: '', startDate: '', endDate: '', description: ''});
        setArrayWorkExperience([]);
        setTech([]);
        setPhoto(null);
        handleClose();
    }
    
    const editUser = () => {
        if (editableUser !== undefined) {
            const objUser = { 'firstName': firstName, 'lastName': lastName, 'description': description, 'educationList': arrayEducation, 'workExperienceList': arrayWorkExperience, 'technologyList': tech, 'photoUrl': url };
            dispatch({ type: usersActions.EDIT_USER_REQUEST, id: editableUser.id, payload: objUser });
            setFirstName('');
            setLastName('');
            setDescription('');
            setEducation({universityId: '', speciality: '', startDate: '', endDate: ''});
            setArrayEducation([]);
            setWorkExperience({companyId: '', position: '', startDate: '', endDate: '', description: '' });
            setArrayWorkExperience([]);
            setTech([]);
            setPhoto(null);
            handleClose();
        }
    }
    useEffect(() => {
        if (editableUser !== undefined) {
            setFirstName(editableUser.firstName);
            setLastName(editableUser.lastName);
            setDescription(editableUser.description);
            setArrayEducation(editableUser.educationList);
            setArrayWorkExperience(editableUser.workExperienceList);
            setTech(editableUser.technologyList);
            setPhoto(editableUser.photoUrl);
            handleClose();
        }
    }, [editableUser]);

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
    const handleChangeUniversity = (index: number) => (event: SelectChangeEvent) => {
        const currentEducation = arrayEducation[index];
        const editedArr = [...arrayEducation];
        editedArr[index as number] = {...currentEducation, [event.target.name]: event.target.value};
        setArrayEducation(editedArr);
    };
    const handleChangeEducation = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentEducation = arrayEducation[index];
        const editedArr = [...arrayEducation];
        editedArr[index as number] ={...currentEducation, [event.target.name]: event.target.value};
        setArrayEducation(editedArr);
    };
    const removeEducation = (index: number): void => {
        setArrayEducation([...arrayEducation.slice(0, index), ...arrayEducation.slice(index + 1)]);
    };
    const handleAddEducation = () =>{
        setArrayEducation([...arrayEducation, education])
        }
    ;
    const handleChangeCompany = (index: number) => (event: SelectChangeEvent) => {
        const currentWorkExp = arrayWorkExperience[index];
        const editedArr = [...arrayWorkExperience];
        editedArr[index as number] = {...currentWorkExp, [event.target.name]: event.target.value};
        setArrayWorkExperience(editedArr);
    };
    const handleChangeWorkExperience = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentWorkExp = arrayWorkExperience[index];
        const editedArr = [...arrayWorkExperience];
        editedArr[index as number] ={...currentWorkExp, [event.target.name]: event.target.value};
        setArrayWorkExperience(editedArr);
    };
    const removeWorkExperience = (index: number): void => {
        setArrayWorkExperience([...arrayWorkExperience.slice(0, index), ...arrayWorkExperience.slice(index + 1)]);
    };
    const handleAddWorkExperience = () =>
        setArrayWorkExperience([...arrayWorkExperience, workExperience])
    ;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: 'scroll' }}
        >
            <Box sx={style}>
                <PhotoModal 
                    handleClosePhoto={handleClosePhoto}
                    openPhoto={openPhoto}
                    photo={photo}
                    setPhoto={setPhoto}
                    params={params}
                    setParams={setParams}
                />
                {/* <PhotoModalTemp
                    handleClosePhoto={handleClosePhoto}
                    openPhoto={openPhoto}
                    photo={photo}
                    setPhoto={setPhoto}
                    params={params}
                    setParams={setParams}
                /> */}
                <Box sx={{ m: '30px' }}>
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
                        <Box sx={{ m: 0, p: 0, display: 'flex' }}>
                            <Box sx={{ mr: '35px', ml: 0, mt: 0, mb: 0, p: 0 }}>
                                <Box sx={{ ml: '15px', mb: '20px' }}>
                                    <Photo params={initialParams} photo={photo}/>
                                </Box>
                                    <CustomButton variant="outlined"
                                        children= {`+ ${editableUser ? "Edit " : "Add "}photo`}
                                    onClick={handleOpenPhoto}
                                    />
                            </Box>
                            <Box sx={{ m: 0, p: 0 }}>
                                <Box sx={{ mr: '20px', mb: '25px' }}>
                                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                        First name
                                    </Typography>
                                    <OutlinedInput placeholder='First name'
                                        value={firstName}
                                        id="input"
                                        sx={{ width: '503px', mb: '0px', height: '50px' }}
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
                                        sx={{ width: '503px', mb: '0px', height: '50px' }}
                                        onChange={handleChangeLastName}
                                    />
                                </Box>
                            </Box>
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
                            {arrayEducation.length && arrayEducation.map((education, index) => (
                              
                                <Box sx={{m:0, p:0}} key={index}>
                                    {index > 0 && (
                                        <Box sx={{ position: `relative`, left: `-35px`, top: `40px` }}>
                                            <DelInput index={index} removeItem={removeEducation} />
                                        </Box>
                                    )} 
                                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                        University
                                    </Typography>
                                    <FormControl>
                                        <Select
                                            defaultValue={""}
                                            value={education.universityId}
                                            name='universityId'
                                            onChange={handleChangeUniversity(index)}
                                            sx={{ width: '700px', height: '50px', mb: '20px' }}
                                            displayEmpty
                                        >
                                            <MenuItem value="">
                                                <em>Select university</em>
                                            </MenuItem>
                                            {
                                                universities.map((uni: IUniversity) => <MenuItem value={uni.id}>{uni.name}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                    <Box sx={{display: 'flex', mb: '25px'}}>
                                        <Box sx={{ mr: '20px' }}>
                                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                                Speciality
                                            </Typography>
                                            <OutlinedInput placeholder='Speciality'
                                                value={education.speciality}
                                                name='speciality'
                                                id="input"
                                                sx={{ width: '410px', mb: '0px', height: '50px' }}
                                                onChange={handleChangeEducation(index)}
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
                                                    InputProps={{inputProps: { min: "1950-01-01", max: "2022-05-04"} }}
                                                    sx={{ width: '130px', mr: '10px' }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    name='startDate'
                                                    value={education.startDate}
                                                    onChange={handleChangeEducation(index)}
                                                />
                                                <TextField
                                                    id="date"
                                                    label="End date"
                                                    type="date"
                                                    defaultValue="2022-05-26"
                                                    InputProps={{inputProps: { min: "1950-01-01", max: "2022-05-04"} }}
                                                    sx={{ width: '130px' }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    name='endDate'
                                                    value={education.endDate}
                                                    onChange={handleChangeEducation(index)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            ))} 
                            <Box sx={{ mb: '35px' }}>
                                <CustomButton variant="outlined"
                                    children='+ Add Education'
                                    onClick={handleAddEducation}
                                />
                            </Box>
                        </Box>
                        <Divider variant="inset" sx={{ border: '1px solid #E3E3EA', mb: '40px', width: '700px', ml: 0}} />
                        <Box>
                            <Typography sx={{ fontSize: '16px', color: '#535E6C', fontWeight: 600, mb: '15px' }}>
                                WORK EXPERIENCE
                            </Typography>
                            {arrayWorkExperience.length && arrayWorkExperience.map((workExperience, index) => (
                                 <Box sx={{m:0, p:0}} key={index}>
                                    {index > 0 && (
                                        <Box sx={{ position: `relative`, left: `-35px`, top: `40px` }}>
                                            <DelInput index={index} removeItem={removeWorkExperience} />
                                        </Box>
                                    )} 
                                    <Box sx={{display: 'flex'}}>
                                        <Box sx={{mr: '20px'}}>
                                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                                Company name
                                            </Typography>
                                            <FormControl>
                                                <Select
                                                    onChange={handleChangeCompany(index)}
                                                    defaultValue={""}
                                                    value = {workExperience.companyId}
                                                    name='companyId'
                                                    sx={{ width: '195px', height: '50px', mb: '20px' }}
                                                    displayEmpty
                                                >
                                                    <MenuItem value="">
                                                        <em>Select company</em>
                                                    </MenuItem>
                                                    {
                                                        companies.map((comp: ICompany) => <MenuItem value={comp.id}>{comp.name}</MenuItem>)
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box sx={{ mr: '20px' }}>
                                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                                Position
                                            </Typography>
                                            <OutlinedInput placeholder='Position'
                                                value={workExperience.position}
                                                name='position'
                                                id="input"
                                                sx={{ width: '195px', mb: '0px', height: '50px' }}
                                                onChange={handleChangeWorkExperience(index)}
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
                                                    InputProps={{inputProps: { min: "1950-01-01", max: "2022-05-04"} }}
                                                    sx={{ width: '130px', mr: '10px' }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    name='startDate'
                                                    value={workExperience.startDate}
                                                    onChange={handleChangeWorkExperience(index)}
                                                />
                                                <TextField
                                                    id="date"
                                                    label="End date"
                                                    type="date"
                                                    defaultValue="2017-05-24"
                                                    InputProps={{inputProps: { min: "1950-01-01", max: "2022-05-04"} }}
                                                    sx={{ width: '130px' }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    name='endDate'
                                                    value={workExperience.endDate}
                                                    onChange={handleChangeWorkExperience(index)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box> 
                                    <Box sx={{ mr: '20px', mb: '25px' }}>
                                        <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                            Description
                                        </Typography>
                                        <OutlinedInput placeholder='Description'
                                            id="input"
                                            sx={{ width: '700px', mb: '0px', height: '100px' }}
                                            name='description'
                                            value={workExperience.description}
                                            onChange={handleChangeWorkExperience(index)}
                                        />
                                    </Box>
                                </Box>
                            ))}
                            <Box sx={{ mb: '35px' }}>
                                <CustomButton variant="outlined"
                                    children='+ Add Work Experience'
                                    onClick={handleAddWorkExperience}
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
                                onClick={addUser}
                                children='Add User'
                                disabled={!isDisabled}
                            />
                        </Box>
                    ) : (
                        <Box  sx={{mt: '15px'}}>
                            <CustomButton variant="contained"
                                onClick={editUser}
                                children='Save User'
                                disabled={!isDisabled}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Modal>
    )
}
export default UserModal