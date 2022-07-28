import React, { useEffect } from 'react';
import CustomButton from '../../../Items/CustomButton';
import { useAppDispatch, useTypedSelector } from '../../../../redusers/useTypedSelector';
import { Box, Divider, Modal, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { IEducation, IPhotoParams, ITechnology, IUser, IWorkExperience } from '../../../../interfaces';
import ChipSelect from '../../../Items/ChipSelect';
import DelInput from '../../../../img/DelInput';
import { usersActions } from '../../../../actionsTypes/usersActionTypes';
import { userPhotosActions } from '../../../../actionsTypes/userPhotosActionTypes';
import Photo from '../Items/Photo';
import PhotoModalTemp from './PhotoModalTemp';
import ModalInput from '../../../Items/ModalInput';
import ModalFormControl from '../../../Items/ModalFormControl';

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
const initialParams: IPhotoParams = {
    scale: 1,
    position: {
        x: 0.5,
        y: 0.5,
    },
};
const UserModal: React.FC<IUserModal> = ({ open, handleClose, editableUser }) => {

    let universities = useTypedSelector((state) => state.universities.universities);
    let companies = useTypedSelector((state) => state.companies.companies);
    let url = useTypedSelector((state) => state.userPhotos.result.add);
    let photoParams = useTypedSelector((state) => state.userPhotos.result.addParams);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [education, setEducation] = React.useState({ universityId: '', speciality: '', startDate: '', endDate: '' });
    const [arrayEducation, setArrayEducation] = React.useState<IEducation[]>([education]);
    const [workExperience, setWorkExperience] = React.useState({ companyId: '', position: '', startDate: '', endDate: '', description: '' });
    const [arrayWorkExperience, setArrayWorkExperience] = React.useState<IWorkExperience[]>([workExperience]);
    const [tech, setTech] = React.useState<ITechnology[]>([]);
    const [openPhoto, setOpenPhoto] = React.useState(false);
    const [params, setParams] = React.useState(initialParams);
    const [photo, setPhoto] = React.useState<string | null>(url);
    const handleOpenPhoto = () => setOpenPhoto(true);
    const handleClosePhoto = () => {
        if (params !== initialParams) {
            if (editableUser === undefined || editableUser.photoParamsId === null) {
                dispatch({ type: userPhotosActions.ADD_PHOTOPARAMS_REQUEST, payload: { 'scale': params.scale.toFixed(10), 'positionX': params.position.x.toFixed(10), 'positionY': params.position.y.toFixed(10) } });
            } else {
                dispatch({ type: userPhotosActions.EDIT_PHOTOPARAMS_REQUEST, id: editableUser.photoParamsId, payload: { 'scale': params.scale, 'positionX': params.position.x.toFixed(10), 'positionY': params.position.y.toFixed(10) } });
            }
        }
        setOpenPhoto(false);
    };

    const handleOpenPhotoModal = (e: any) => {
        e.stopPropagation();
        setPhoto(null);
    };

    useEffect(() => {
        if (url !== undefined && url !== null) {
            setPhoto(url)
        }
    }, [url]);

    useEffect(() => {
        if (photoParams !== undefined && photoParams !== null) {
            let newParams = {
                id: photoParams.id,
                scale: photoParams.scale,
                position: {
                    x: photoParams.positionX,
                    y: photoParams.positionY,
                }
            };
            setParams(newParams)
        } else { setParams(initialParams) }
    }, [photoParams]);

    const [check, setCheck] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        setIsError(false);
        (firstName === '' || lastName === '' || description === '' || tech === [] || arrayEducation[0].universityId === ''
            || arrayEducation[0].speciality === '' || arrayEducation[0].startDate === '' || arrayEducation[0].endDate === ''
            || arrayWorkExperience[0].companyId === '' || arrayWorkExperience[0].position === '' || arrayWorkExperience[0].description === ''
            || arrayWorkExperience[0].startDate === '' || arrayWorkExperience[0].endDate === ''
        ) && setIsError(true)
    }, [firstName, lastName, description, tech, arrayEducation, arrayWorkExperience]);

    const dispatch = useAppDispatch();
    const addUser = () => {
        const clearArrayEducation = arrayEducation.filter(el => el.universityId !== "" && el.speciality !== "" && el.startDate !== "" && el.endDate !== "")
        const clearArrayWorkExperience = arrayWorkExperience.filter(el => el.companyId !== "" && el.position !== "" && el.startDate !== "" && el.endDate !== "" && el.description !== "")
        const objUser = { 'firstName': firstName, 'lastName': lastName, 'description': description, 'educationList': clearArrayEducation, 'workExperienceList': clearArrayWorkExperience, 'technologyList': tech, 'photoUrl': url, 'photoParamsId': params.id };
        dispatch({ type: usersActions.ADD_USER_REQUEST, payload: objUser });
        setFirstName('');
        setLastName('');
        setDescription('');
        setEducation({ universityId: '', speciality: '', startDate: '', endDate: '' });
        setArrayEducation([]);
        setWorkExperience({ companyId: '', position: '', startDate: '', endDate: '', description: '' });
        setArrayWorkExperience([]);
        setTech([]);
        setPhoto(null);
        setParams(initialParams);
        handleClose();
    };

    const editUser = () => {
        if (editableUser !== undefined) {
            const clearArrayEducation = arrayEducation.filter(el => el.universityId !== "" && el.speciality !== "" && el.startDate !== "" && el.endDate !== "")
            const clearArrayWorkExperience = arrayWorkExperience.filter(el => el.companyId !== "" && el.position !== "" && el.startDate !== "" && el.endDate !== "" && el.description !== "")
            const objUser = { 'id': editableUser.id, 'firstName': firstName, 'lastName': lastName, 'description': description, 'educationList': clearArrayEducation, 'workExperienceList': clearArrayWorkExperience, 'technologyList': tech, 'photoUrl': photo, 'photoParamsId': params.id };
            dispatch({ type: usersActions.EDIT_USER_REQUEST, id: editableUser.id, payload: objUser });
            setFirstName('');
            setLastName('');
            setDescription('');
            setEducation({ universityId: '', speciality: '', startDate: '', endDate: '' });
            setArrayEducation([]);
            setWorkExperience({ companyId: '', position: '', startDate: '', endDate: '', description: '' });
            setArrayWorkExperience([]);
            setTech([]);
            setPhoto(null);
            setParams(initialParams);
            handleClose();
        }
    };
    useEffect(() => {
        if (editableUser !== undefined) {
            setFirstName(editableUser.firstName);
            setLastName(editableUser.lastName);
            setDescription(editableUser.description);
            setArrayEducation(editableUser.educationList);
            setArrayWorkExperience(editableUser.workExperienceList);
            setTech(editableUser.technologyList);
            setPhoto(editableUser.photoUrl);
            if (editableUser.photoParams !== null) {
                let newParams: IPhotoParams = {
                    id: editableUser.photoParams.id,
                    scale: editableUser.photoParams.scale,
                    position: {
                        x: editableUser.photoParams.positionX,
                        y: editableUser.photoParams.positionY,
                    }
                };
                setParams(newParams)
            }
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
        editedArr[index as number] = { ...currentEducation, [event.target.name]: event.target.value };
        setArrayEducation(editedArr);
    };
    const handleChangeEducation = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentEducation = arrayEducation[index];
        const editedArr = [...arrayEducation];
        editedArr[index as number] = { ...currentEducation, [event.target.name]: event.target.value };
        setArrayEducation(editedArr);
    };
    const removeEducation = (index: number): void => {
        setArrayEducation([...arrayEducation.slice(0, index), ...arrayEducation.slice(index + 1)]);
    };
    const handleAddEducation = () => {
        setArrayEducation([...arrayEducation, education])
    };
    const handleChangeCompany = (index: number) => (event: SelectChangeEvent) => {
        const currentWorkExp = arrayWorkExperience[index];
        const editedArr = [...arrayWorkExperience];
        editedArr[index as number] = { ...currentWorkExp, [event.target.name]: event.target.value };
        setArrayWorkExperience(editedArr);
    };
    const handleChangeWorkExperience = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentWorkExp = arrayWorkExperience[index];
        const editedArr = [...arrayWorkExperience];
        editedArr[index as number] = { ...currentWorkExp, [event.target.name]: event.target.value };
        setArrayWorkExperience(editedArr);
    };
    const removeWorkExperience = (index: number): void => {
        setArrayWorkExperience([...arrayWorkExperience.slice(0, index), ...arrayWorkExperience.slice(index + 1)]);
    };
    const handleAddWorkExperience = () =>
        setArrayWorkExperience([...arrayWorkExperience, workExperience]
        );

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: 'scroll' }}
        >
            <Box sx={style}>
                <PhotoModalTemp
                    handleClosePhoto={handleClosePhoto}
                    handleOpenPhotoModal={handleOpenPhotoModal}
                    openPhoto={openPhoto}
                    photo={photo}
                    params={params}
                    setParams={setParams}
                />
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
                                    <Photo params={params} photo={photo} />
                                </Box>
                                <CustomButton variant="outlined"
                                    children={`+ ${editableUser ? "Edit " : "Add "}photo`}
                                    onClick={handleOpenPhoto}
                                />
                            </Box>
                            <Box sx={{ m: 0, p: 0 }}>
                                <Box sx={{ mr: '20px', mb: '25px' }}>
                                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                        First name
                                    </Typography>
                                    <ModalInput placeholder='First name'
                                        item={firstName}
                                        check={check}
                                        index={0}
                                        width={503}
                                        height={50}
                                        setItem={handleChangeFirstName}
                                    />
                                </Box>
                                <Box sx={{ mr: '20px', mb: '25px' }}>
                                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                        Last name
                                    </Typography>
                                    <ModalInput placeholder='Last name'
                                        item={lastName}
                                        check={check}
                                        index={0}
                                        width={503}
                                        height={50}
                                        setItem={handleChangeLastName}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ mr: '20px', mb: '40px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Description
                            </Typography>
                            <ModalInput placeholder='Description'
                                item={description}
                                check={check}
                                index={0}
                                width={700}
                                height={100}
                                setItem={handleChangeDescription}
                            />
                        </Box>
                        <Divider variant="inset" sx={{ border: '1px solid #E3E3EA', mb: '40px', width: '700px', ml: 0 }} />
                        <Box>
                            <Typography sx={{ fontSize: '16px', color: '#535E6C', fontWeight: 600, mb: '15px' }}>
                                EDUCATION
                            </Typography>
                            {arrayEducation.length && arrayEducation.map((education, index) => (

                                <Box sx={{ m: 0, p: 0 }} key={index}>
                                    {index > 0 && (
                                        <Box sx={{ position: `relative`, left: `-35px`, top: `40px` }}>
                                            <DelInput index={index} removeItem={removeEducation} />
                                        </Box>
                                    )}
                                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                        University
                                    </Typography>
                                    <ModalFormControl elements={universities}
                                        selectName={'universityId'}
                                        placeholder={'university'}
                                        type={education.universityId}
                                        setType={handleChangeUniversity(index)}
                                        check={check} index={index}
                                        width={700} height={50}
                                    />
                                    <Box sx={{ display: 'flex', mb: '25px' }}>
                                        <Box sx={{ mr: '20px' }}>
                                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                                Speciality
                                            </Typography>
                                            <ModalInput placeholder='Speciality'
                                                selectName={'speciality'}
                                                item={education.speciality}
                                                check={check}
                                                index={index}
                                                width={410}
                                                height={50}
                                                setItem={handleChangeEducation(index)}
                                            />
                                        </Box>
                                        <Box sx={{ mr: '20px' }}>
                                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                                Start date - End date
                                            </Typography>
                                            <Box sx={{ display: 'flex' }}>
                                                <TextField
                                                    error={education.startDate === '' && check && index === 0}
                                                    id="date"
                                                    label="Start date"
                                                    type="date"
                                                    defaultValue="2022-05-26"
                                                    InputProps={{ inputProps: { min: "1950-01-01", max: "2022-05-04" } }}
                                                    sx={{ width: '130px', mr: '10px' }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    name='startDate'
                                                    value={education.startDate}
                                                    onChange={handleChangeEducation(index)}
                                                />
                                                <TextField
                                                    error={education.endDate === '' && check && index === 0}
                                                    id="date"
                                                    label="End date"
                                                    type="date"
                                                    defaultValue="2022-05-26"
                                                    InputProps={{ inputProps: { min: "1950-01-01", max: "2022-05-04" } }}
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
                        <Divider variant="inset" sx={{ border: '1px solid #E3E3EA', mb: '40px', width: '700px', ml: 0 }} />
                        <Box>
                            <Typography sx={{ fontSize: '16px', color: '#535E6C', fontWeight: 600, mb: '15px' }}>
                                WORK EXPERIENCE
                            </Typography>
                            {arrayWorkExperience.length && arrayWorkExperience.map((workExperience, index) => (
                                <Box sx={{ m: 0, p: 0 }} key={index}>
                                    {index > 0 && (
                                        <Box sx={{ position: `relative`, left: `-35px`, top: `40px` }}>
                                            <DelInput index={index} removeItem={removeWorkExperience} />
                                        </Box>
                                    )}
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ mr: '20px' }}>
                                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                                Company name
                                            </Typography>
                                            <ModalFormControl elements={companies}
                                                selectName={'companyId'}
                                                placeholder={'company'}
                                                type={workExperience.companyId}
                                                setType={handleChangeCompany(index)}
                                                check={check} index={index}
                                                width={195} height={50}
                                            />
                                        </Box>
                                        <Box sx={{ mr: '20px' }}>
                                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                                Position
                                            </Typography>
                                            <ModalInput placeholder='Position'
                                                selectName={'position'}
                                                item={workExperience.position}
                                                check={check}
                                                index={index}
                                                width={195}
                                                height={50}
                                                setItem={handleChangeWorkExperience(index)}
                                            />
                                        </Box>
                                        <Box sx={{ mr: '20px' }}>
                                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                                Start date - End date
                                            </Typography>
                                            <Box sx={{ display: 'flex' }}>
                                                <TextField
                                                    error={workExperience.startDate === '' && check && index === 0}
                                                    id="date"
                                                    label="Start date"
                                                    type="date"
                                                    defaultValue="2017-05-24"
                                                    InputProps={{ inputProps: { min: "1950-01-01", max: "2022-05-04" } }}
                                                    sx={{ width: '130px', mr: '10px' }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    name='startDate'
                                                    value={workExperience.startDate}
                                                    onChange={handleChangeWorkExperience(index)}
                                                />
                                                <TextField
                                                    error={workExperience.endDate === '' && check && index === 0}
                                                    id="date"
                                                    label="End date"
                                                    type="date"
                                                    defaultValue="2017-05-24"
                                                    InputProps={{ inputProps: { min: "1950-01-01", max: "2022-05-04" } }}
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
                                    <Box sx={{ mr: '20px', mb: '75px' }}>
                                        <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                            Description
                                        </Typography>
                                        <ModalInput placeholder='Description'
                                            selectName={'description'}
                                            check={check}
                                            index={index}
                                            width={700}
                                            height={100}
                                            item={workExperience.description}
                                            setItem={handleChangeWorkExperience(index)}
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
                    <Divider variant="inset" sx={{ border: '1px solid #E3E3EA', mb: '40px', width: '700px', ml: 0 }} />
                    <Typography sx={{ fontSize: '16px', color: '#535E6C', fontWeight: 600, mb: '15px' }}>
                        TECHNOLOGIES
                    </Typography>
                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                        Skills
                    </Typography>
                    <ChipSelect tech={tech} setTech={setTech} check={check} />
                    {(editableUser === undefined) ? (
                        <Box sx={{ mt: '15px' }}>
                            <CustomButton variant="contained"
                                children='Add User'
                                onClick={() => {
                                    if (isError) setCheck(true);
                                    else (addUser())
                                }}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ mt: '15px' }}>
                            <CustomButton variant="contained"
                                children='Save User'
                                onClick={() => {
                                    if (isError) setCheck(true);
                                    else (editUser())
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Modal>
    )
}
export default UserModal