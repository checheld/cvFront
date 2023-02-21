import React, { useEffect, useState } from 'react';
import CustomButtonFixed from '../../../Items/CustomButtonFixed';
import { useAppDispatch, useTypedSelector } from '../../../../redusers/useTypedSelector';
import { Box, Modal, SelectChangeEvent, styled, Typography } from '@mui/material';
import { ICV, IProjectCV } from '../../../../interfaces';
import DelInput from '../../../../img/DelInput';
import { CVsActions } from '../../../../actionsTypes/CVsActionTypes';
import ModalInput from '../../../Items/ModalInput';
import ModalFormControl from '../../../Items/ModalFormControl';
import DateField from '../../../Items/DateField';
import CloseIcon from "@mui/icons-material/Close";
import ModalInputPosition from '../../Users/Modal/Items/ModalInputPosition';
import ModalFormControlSmall from '../../../Items/ModalFormControlSmall';
import '../../../Components.css';

interface ICVModal {
    open: boolean,
    handleClose: () => void,
    editableCV?: ICV
}


const CustomBoxDate = styled(Box)(() => ({
    display: 'flex',
    ['@media (max-width:376px)']: {
        flexWrap: 'wrap',
    }
}))

const CVModal: React.FC<ICVModal> = ({ open, handleClose, editableCV }) => {
    const dispatch = useAppDispatch();
    let users = useTypedSelector((state) => state.users.users);
    let projects = useTypedSelector((state) => state.projects.projects);

    const [CVName, setCVName] = useState('');
    const [userId, setUser] = useState(0);
    const [projectCV, setProjectCV] = useState({ project: {'id': 0}, position: '', description: '', startDate: '', endDate: '' });
    const [arrayProjectCV, setArrayProjectCV] = useState([projectCV]);

    const handleChangeCVName = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        setCVName(value);
    };
    const handleChangeUser = (event: SelectChangeEvent) => {
        setUser(Number(event.target.value));
    };
    const handleChangeProject = (index: number) => (event: SelectChangeEvent) => {
        const currentProjectCV = arrayProjectCV[index];
        const editedArr = [...arrayProjectCV];
        editedArr[index as number] = { ...currentProjectCV, [event.target.name]: {id: Number(event.target.value)} };
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
        const clearArrayProjectCV = arrayProjectCV.filter(el => el.project.id !== 0 && el.position !== "" && el.description !== "" && el.startDate !== "" && el.endDate !== "")
        const objCV = { 'cvName': CVName, 'user': {'id': userId}, 'projectcvs': clearArrayProjectCV };
        dispatch({ type: CVsActions.ADD_CV_REQUEST, payload: objCV });
        setCVName('');
        setUser(0);
        setProjectCV({ project: {'id': 0}, position: '', description: '', startDate: '', endDate: '' });
        setArrayProjectCV([]);
        handleClose();
    }
    const editCV = () => {
        if (editableCV !== undefined) {
            const clearArrayProjectCV = arrayProjectCV.filter(el => el.project.id !== 0 && el.position !== "" && el.description !== "" && el.startDate !== "" && el.endDate !== "")
            const projCVWithCVId = clearArrayProjectCV.map(pcv => ({...pcv, 'cv': {'id': editableCV.id}}))
            const objCV = { 'id': editableCV.id, 'cvName': CVName, 'user': {'id': userId}, 'createdAt': editableCV.createdAt, projectcvs: projCVWithCVId };
            dispatch({ type: CVsActions.EDIT_CV_REQUEST, id: editableCV.id, payload: objCV });
            setCVName('');
            setUser(0);
            setProjectCV({ project: {'id': 0}, position: '', description: '', startDate: '', endDate: '' });
            setArrayProjectCV([]);
            handleClose();
        }
    }
    useEffect(() => {
        if (editableCV !== undefined) {
            setCVName(editableCV.cvName);
            setUser(editableCV.user.id);
            setArrayProjectCV(editableCV.projectcvs);
            handleClose();
        }
    }, [editableCV]);

    const [check, setCheck] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
        (CVName === '' || userId === 0 || arrayProjectCV[0].project.id === 0
            || arrayProjectCV[0].position === '' || arrayProjectCV[0].startDate === ''
            || arrayProjectCV[0].endDate === '' || arrayProjectCV[0].description === ''
        ) && setIsError(true)
    }, [CVName, userId, arrayProjectCV]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div className='modal'>
                <Box sx={{ m: '10px' }}>
                    {(editableCV === undefined) ? (
                        <Typography className='mainModalName'>
                            Add CV
                        </Typography>
                    ) : (
                        <Typography className='mainModalName'>
                            Edit CV
                        </Typography>
                    )}
                    <CloseIcon
                        className='closeIcon'
                        onClick={handleClose}
                    />
                    <Box className='scrollContainer'>
                        <Box sx={{ mr: '20px', mb: '25px' }}>
                            <Typography className='inputTitle'>
                                CV name
                            </Typography>
                            <ModalInput placeholder='CV name'
                                item={CVName}
                                check={check}
                                index={0}
                                height={50}
                                setItem={handleChangeCVName}
                                inputLength={55}
                            />
                        </Box>
                        <Box sx={{ mr: '20px', mb: '15px' }}>
                            <Typography className='inputTitle'>
                                User
                            </Typography>
                            <ModalFormControl elements={users}
                                selectName={'userId'}
                                placeholder={'user'}
                                type={userId}
                                setType={handleChangeUser}
                                check={check} index={0}
                            />
                        </Box>
                        {arrayProjectCV.length && arrayProjectCV.map((projectCV, index) => (
                            <Box sx={{ m: 0, p: 0 }} key={index}>
                                {index > 0 && (
                                    <Box sx={{ position:'relative', left: '-35px', top: '30px'}}>
                                        <DelInput index={index} removeItem={removeProjectCV} />
                                    </Box>
                                )}
                                <div className='modalInternalContainer'>
                                    <Box sx={{ mr: '16px' }}>
                                        <Typography className='inputTitle'>
                                            Project
                                        </Typography>
                                        <ModalFormControlSmall elements={projects}
                                            selectName={'project'}
                                            placeholder={'project'}
                                            type={projectCV.project.id}
                                            setType={handleChangeProject(index)}
                                            check={check} index={index}
                                        />
                                    </Box>
                                    <div className='projectContainer' >
                                        <Box sx={{ mr: '16px' }}>
                                            <Typography className='inputTitle'>
                                                Position
                                            </Typography>
                                            <ModalInputPosition item={projectCV.position}
                                                check={check} index={index}
                                                setItem={handleChangeProjectCV(index)}
                                            />
                                        </Box>
                                        <Box sx={{ mr: '20px' }}>
                                            <Typography className='inputTitle'>
                                                Start date - End date
                                            </Typography>
                                            <CustomBoxDate>
                                                <DateField item={projectCV.startDate} setItem={handleChangeProjectCV(index)} check={check} index={index} label={"Start date"} name={'startDate'} />
                                                <DateField item={projectCV.endDate} setItem={handleChangeProjectCV(index)} check={check} index={index} label={"End date"} name={'endDate'} />
                                            </CustomBoxDate>
                                        </Box>
                                    </div>
                                </div>
                                <Box sx={{ mr: '20px' }}>
                                    <Typography className='inputTitle'>
                                        Description
                                    </Typography>
                                    <ModalInput placeholder='Description'
                                        selectName={'description'}
                                        item={projectCV.description}
                                        check={check}
                                        index={index}
                                        height={100}
                                        setItem={handleChangeProjectCV(index)}
                                        inputLength={500}
                                    />
                                </Box>
                            </Box>
                        ))}
                        <Box sx={{ mb: '35px' }}>
                            <CustomButtonFixed variant="outlined"
                                children='+ Add Project'
                                onClick={handleAddProjectCV}
                            />
                        </Box>
                    </Box>
                    {(editableCV === undefined) ? (
                        <Box sx={{ m: '30px 0 20px 40px' }}>
                            <CustomButtonFixed variant="contained"
                                children='Add CV'
                                onClick={() => {
                                    if (isError) setCheck(true);
                                    else (addCV())
                                }}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ m: '30px 0 20px 40px' }}>
                            <CustomButtonFixed variant="contained"
                                children='Save CV'
                                onClick={() => {
                                    if (isError) setCheck(true);
                                    else (editCV())
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </div>
        </Modal>
    )
}
export default CVModal