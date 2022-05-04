import React, { useEffect } from 'react';
import CustomButton from '../../../Items/CustomButton';
import { useAppDispatch, useTypedSelector } from '../../../../redusers/useTypedSelector';
import { Box, FormControl, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { ICV, IProject, IProjectCV, IUser } from '../../../../interfaces';
import DelInput from '../../../../img/DelInput';
import { CVsActions } from '../../../../actionsTypes/CVsActionTypes';

interface ICVModal {
    open: boolean,
    handleClose: () => void,
    editableCV?: ICV
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    bgcolor: '#FFFFFF',
    borderRadius: '30px',
    boxShadow: 24,
    p: 4,
};

const CVModal: React.FC<ICVModal> = ({ open, handleClose, editableCV }) => {
    const dispatch = useAppDispatch();
    let users = useTypedSelector((state) => state.users.users);
    let projects = useTypedSelector((state) => state.projects.projects);
    
    const [CVName, setCVName] = React.useState('');
    const [userId, setUser] = React.useState('');
    const [projectCV, setProjectCV] = React.useState<IProjectCV>({ projectId: '', position: '', description: '', startDate: '', endDate: '' });
    const [arrayProjectCV, setArrayProjectCV] = React.useState<IProjectCV[]>([projectCV]); 

    const handleChangeCVName = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        setCVName(value);
    };
    const handleChangeUser = (event: SelectChangeEvent) => {
        setUser(event.target.value);
    };
    const handleChangeProject = (index: number) => (event: SelectChangeEvent) => {
        setProjectCV({...projectCV, [event.target.name]: event.target.value})
        const editedArr = [...arrayProjectCV];
        editedArr[index as number] = {...projectCV, [event.target.name]: event.target.value};
        setArrayProjectCV(editedArr);
    };
    const handleChangeProjectCV = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setProjectCV({...projectCV, [event.target.name]: event.target.value})
        const editedArr = [...arrayProjectCV];
        editedArr[index as number] ={...projectCV, [event.target.name]: event.target.value};
        setArrayProjectCV(editedArr);
    };
    const removeProjectCV = (index: number): void => {
        setArrayProjectCV([...arrayProjectCV.slice(0, index), ...arrayProjectCV.slice(index + 1)]);
    };
    const handleAddProjectCV = () => {
        setArrayProjectCV([...arrayProjectCV, projectCV])
    };

    const addCV = () => {
        const objCV = { 'CVName': CVName, 'userId': userId, 'projectCVList': arrayProjectCV };
        dispatch({ type: CVsActions.ADD_CV_REQUEST, payload: objCV });
        setCVName('');
        setUser('');
        setProjectCV({projectId: '', position: '', description: '', startDate: '', endDate: ''});
        setArrayProjectCV([]);
        handleClose();
    }
    const editCV = () => {
        if (editableCV !== undefined) {
            const objCV = { 'CVName': CVName, 'userId': userId, 'projectCVList': arrayProjectCV };
            dispatch({ type: CVsActions.EDIT_CV_REQUEST, id: editableCV.id, payload: objCV });
            setCVName('');
            setUser('');
            setProjectCV({projectId: '', position: '', description: '', startDate: '', endDate: ''});
            setArrayProjectCV([]);
            handleClose();
        }
    }
    useEffect(() => {
        if (editableCV !== undefined) {
            setCVName(editableCV.cvName);
            
            let findUser = users.find(item => item.id === editableCV.userId);
            //let findUserId = findUser!.id;
            console.log(findUser)
            setUser(editableCV.userId);

            setArrayProjectCV(editableCV.projectCVList);
            handleClose();
        }
    }, [editableCV]);

    let isDisabled;
    if (editableCV === undefined) {
        isDisabled = ((CVName !== '') && (userId !== '') ) ? true : false;
    } 
    else {
        isDisabled = true;
    }

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
                    {(editableCV === undefined) ? (
                        <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
                            Add CV
                        </Typography>
                    ) : (
                        <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
                            Edit CV
                        </Typography>
                    )}
                    <Box>
                        <Box sx={{ mr: '20px', mb: '25px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                CV name
                            </Typography>
                            <OutlinedInput placeholder='First name'
                                value={CVName}
                                id="input"
                                sx={{ width: '700px', mb: '0px', height: '50px' }}
                                onChange={handleChangeCVName}
                            />
                        </Box>
                        <Box sx={{ mr: '20px', mb: '15px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                User
                            </Typography>
                            <FormControl>
                                <Select
                                    defaultValue={""}
                                    name='userId'
                                    value={userId}
                                    onChange={handleChangeUser}
                                    sx={{ width: '700px', height: '50px' }}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        <em>Select user</em>
                                    </MenuItem>
                                    {
                                        users.map((user: IUser) => <MenuItem value={user.id}>{user.firstName} {user.lastName}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        {arrayProjectCV.length && arrayProjectCV.map((projectCV, index) => (
                            <Box sx={{ m: 0, p: 0 }} key={index}>
                                {index > 0 && (
                                    <Box sx={{ position: `relative`, left: `-35px`, top: `40px` }}>
                                        <DelInput index={index} removeItem={removeProjectCV} />
                                    </Box>
                                )}
                                <Box sx={{ display: 'flex', mb: '15px' }}>
                                    <Box sx={{ mr: '20px' }}>
                                        <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                            Project
                                        </Typography>
                                        <FormControl>
                                            <Select
                                                defaultValue={""}
                                                value={projectCV.projectId}
                                                name='projectId'
                                                onChange={handleChangeProject(index)}
                                                sx={{ width: '195px', height: '50px', mb: '20px' }}
                                                displayEmpty
                                            >
                                                <MenuItem value="">
                                                    <em>Select project</em>
                                                </MenuItem>
                                                {
                                                    projects.map((pr: IProject) => <MenuItem value={pr.id}>{pr.name}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ mr: '20px' }}>
                                        <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                            Position
                                        </Typography>
                                        <OutlinedInput placeholder='Position'
                                            value={projectCV.position}
                                            name='position'
                                            id="input"
                                            sx={{ width: '195px', mb: '0px', height: '50px' }}
                                            onChange={handleChangeProjectCV(index)}
                                        />
                                    </Box>
                                    <Box sx={{ mr: '20px' }}>
                                        <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                            Start date - End date
                                        </Typography>
                                        <Box sx={{ display: 'flex' }}>
                                            <TextField
                                                id="date"
                                                label="Start date"
                                                type="date"
                                                defaultValue="2022-05-26"
                                                sx={{ width: '130px', mr: '10px', fontSize: '14px !important'}}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                name='startDate'
                                                value={projectCV.startDate}
                                                onChange={handleChangeProjectCV(index)}
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
                                                name='endDate'
                                                value={projectCV.endDate}
                                                onChange={handleChangeProjectCV(index)}
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
                                        value={projectCV.description}
                                        onChange={handleChangeProjectCV(index)}
                                    />
                                </Box>
                            </Box>
                        ))}
                        <Box sx={{ mb: '35px' }}>
                            <CustomButton variant="outlined"
                                children='+ Add Project'
                                onClick={handleAddProjectCV}
                            />
                        </Box>
                    </Box>
                    {(editableCV === undefined) ? (
                        <Box sx={{ mt: '15px' }}>
                            <CustomButton variant="contained"
                                onClick={addCV}
                                children='Add User'
                                disabled={!isDisabled}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ mt: '15px' }}>
                            <CustomButton variant="contained"
                                onClick={editCV}
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
export default CVModal