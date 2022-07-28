import React, { useEffect } from 'react';
import CustomButton from '../../../Items/CustomButton';
import { useAppDispatch, useTypedSelector } from '../../../../redusers/useTypedSelector';
import { Box, FormControl, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { ICV, IProject, IProjectCV, IUser } from '../../../../interfaces';
import DelInput from '../../../../img/DelInput';
import { CVsActions } from '../../../../actionsTypes/CVsActionTypes';
import ModalInput from '../../../Items/ModalInput';
import ModalFormControl from '../../../Items/ModalFormControl';

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
        const currentProjectCV = arrayProjectCV[index];
        const editedArr = [...arrayProjectCV];
        editedArr[index as number] = { ...currentProjectCV, [event.target.name]: event.target.value };
        setArrayProjectCV(editedArr);
    };
    const handleChangeProjectCV = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentProjectCV = arrayProjectCV[index];
        const editedArr = [...arrayProjectCV];
        editedArr[index as number] = { ...currentProjectCV, [event.target.name]: event.target.value };
        setArrayProjectCV(editedArr);
    };
    const removeProjectCV = (index: number): void => {
        setArrayProjectCV([...arrayProjectCV.slice(0, index), ...arrayProjectCV.slice(index + 1)]);
    };
    const handleAddProjectCV = () => {
        setArrayProjectCV([...arrayProjectCV, projectCV])
    };

    const addCV = () => {
        const clearArrayProjectCV = arrayProjectCV.filter(el => el.projectId !== "" && el.position !== "" && el.description !== "" && el.startDate !== "" && el.endDate !== "")
        const objCV = { 'CVName': CVName, 'userId': userId, 'projectCVList': clearArrayProjectCV };
        dispatch({ type: CVsActions.ADD_CV_REQUEST, payload: objCV });
        setCVName('');
        setUser('');
        setProjectCV({ projectId: '', position: '', description: '', startDate: '', endDate: '' });
        setArrayProjectCV([]);
        handleClose();
    }
    const editCV = () => {
        if (editableCV !== undefined) {
            const clearArrayProjectCV = arrayProjectCV.filter(el => el.projectId !== "" && el.position !== "" && el.description !== "" && el.startDate !== "" && el.endDate !== "")
            const objCV = { 'CVName': CVName, 'userId': userId, 'projectCVList': clearArrayProjectCV };
            dispatch({ type: CVsActions.EDIT_CV_REQUEST, id: editableCV.id, payload: objCV });
            setCVName('');
            setUser('');
            setProjectCV({ projectId: '', position: '', description: '', startDate: '', endDate: '' });
            setArrayProjectCV([]);
            handleClose();
        }
    }
    useEffect(() => {
        if (editableCV !== undefined) {
            setCVName(editableCV.cvName);

            let findUser = users.find(item => item.id === editableCV.userId);
            //let findUserId = findUser!.id;
            setUser(editableCV.userId);

            setArrayProjectCV(editableCV.projectCVList);
            handleClose();
        }
    }, [editableCV]);

    const [check, setCheck] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        setIsError(false);
        (CVName === '' || userId === '' || arrayProjectCV[0].projectId === ''
            || arrayProjectCV[0].position === '' || arrayProjectCV[0].startDate === ''
            || arrayProjectCV[0].endDate === '' || arrayProjectCV[0].description === ''
        ) && setIsError(true)
    }, [CVName, userId, arrayProjectCV]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: 'scroll' }}
        >
            <Box sx={style}>
                <Box sx={{ m: '30px' }}>
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
                            <ModalInput placeholder='CV name'
                                item={CVName}
                                check={check}
                                index={0}
                                width={700}
                                height={50}
                                setItem={handleChangeCVName}
                            />
                        </Box>
                        <Box sx={{ mr: '20px', mb: '15px' }}>
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                User
                            </Typography>
                            <ModalFormControl elements={users}
                                selectName={'userId'}
                                placeholder={'user'}
                                type={userId}
                                setType={handleChangeUser}
                                check={check} index={0}
                                width={700} height={50}
                            />
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
                                        <ModalFormControl elements={projects}
                                            selectName={'projectId'}
                                            placeholder={'project'}
                                            type={projectCV.projectId}
                                            setType={handleChangeProject(index)}
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
                                            item={projectCV.position}
                                            check={check}
                                            index={index}
                                            width={195}
                                            height={50}
                                            setItem={handleChangeProjectCV(index)}
                                        />
                                    </Box>
                                    <Box sx={{ mr: '20px' }}>
                                        <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                            Start date - End date
                                        </Typography>
                                        <Box sx={{ display: 'flex' }}>
                                            {/* <DateField item={projectCV.startDate} setItem={handleChangeProjectCV(index)} check={check} index={index} label={"Start date"} name={'startDate'} /> */}
                                            <TextField
                                                error={projectCV.startDate === '' && check && index === 0}
                                                id="date"
                                                label="Start date"
                                                type="date"
                                                defaultValue="2022-05-26"
                                                InputProps={{ inputProps: { min: "1950-01-01", max: "2022-05-04" } }}
                                                sx={{ width: '130px', mr: '10px', fontSize: '14px !important' }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                name='startDate'
                                                value={projectCV.startDate}
                                                onChange={handleChangeProjectCV(index)}
                                            />
                                            <TextField
                                                error={projectCV.endDate === '' && check && index === 0}
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
                                                value={projectCV.endDate}
                                                onChange={handleChangeProjectCV(index)}
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
                                        item={projectCV.description}
                                        check={check}
                                        index={index}
                                        width={700}
                                        height={100}
                                        setItem={handleChangeProjectCV(index)}
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
                                children='Add User'
                                onClick={() => {
                                    if (isError) setCheck(true);
                                    else (addCV())
                                }}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ mt: '15px' }}>
                            <CustomButton variant="contained"
                                children='Save User'
                                onClick={() => {
                                    if (isError) setCheck(true);
                                    else (editCV())
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Modal>
    )
}
export default CVModal