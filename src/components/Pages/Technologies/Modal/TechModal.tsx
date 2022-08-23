import React, { useEffect, useState } from 'react';
import CustomButton from '../../../Items/CustomButton';
import { useAppDispatch } from '../../../../redusers/useTypedSelector';
import { Box, Modal, Typography } from '@mui/material';
import ModalSelect from '../../../Items/ModalSelect';
import { technologiesActions } from '../../../../actionsTypes/technologiesActionTypes';
import { ITechnology } from '../../../../interfaces';
import DelInput from '../../../../img/DelInput';
import ModalInput from '../../../Items/ModalInput';
import CloseIcon from "@mui/icons-material/Close";
import '../../../Components.css';

interface ITechModal {
    open: boolean,
    handleClose: () => void,
    editableTech?: ITechnology,
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

const TechModal: React.FC<ITechModal> = ({ open, handleClose, editableTech }) => {

    const dispatch = useAppDispatch();
    const [technology, setTechnology] = useState('');
    const [arrayTechnologies, setArrayTechnologies] = useState([{ name: '', type: '' }]);
    const [type, setType] = useState('');

    const handleChangeTechnologies =
        (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const editedArr = [...arrayTechnologies];
            editedArr[index as number].name = event.target.value;
            setArrayTechnologies(editedArr);
        };

    const handleChangeType =
        (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const editedArr = [...arrayTechnologies];
            editedArr[index as number].type = event.target.value;
            setArrayTechnologies(editedArr);
        };

    const removeTechnology = (index: number): void => {
        setArrayTechnologies([...arrayTechnologies.slice(0, index), ...arrayTechnologies.slice(index + 1)]);
    };

    const handleAddTechnology = () => setArrayTechnologies([...arrayTechnologies, { name: technology, type: type }]);

    const addTechnology = () => {
        const clearArrayTechnologies = arrayTechnologies.filter(el => el.name !== "" && el.type !== "")
        dispatch({ type: technologiesActions.ADD_TECHNOLOGY_REQUEST, payload: clearArrayTechnologies });
        setArrayTechnologies([{ name: '', type: '' }]);
        setTechnology('');
        setType('');
        handleClose();
    }
    const editTechnology = () => {
        if (editableTech !== undefined) {
            dispatch({ type: technologiesActions.EDIT_TECHNOLOGY_REQUEST, id: editableTech.id, payload: arrayTechnologies[0] });
            setArrayTechnologies([{ name: '', type: '' }]);
            handleClose();
        }
    }
    useEffect(() => {
        if (editableTech !== undefined) {
            setArrayTechnologies([{ name: editableTech.name, type: editableTech.type }])
        }
    }, [editableTech]);

    const [check, setCheck] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
        (arrayTechnologies[0].name === '' || arrayTechnologies[0].type === '') && setIsError(true)
    }, [arrayTechnologies]);

    const screenWidth = window.screen.width;
    const [inputWidth, setInputWidth] = useState<number>();
    useEffect(() => {
        if (screenWidth <= 1024) setInputWidth(500)
        else setInputWidth(700)
    }, [screenWidth]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='modalContainer'>
                <Box sx={{ m: '50px' }}>
                    {(editableTech === undefined) ? (
                        <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
                            Add Technology
                        </Typography>
                    ) : (
                        <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
                            Edit Technology
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
                    {arrayTechnologies.length && arrayTechnologies.map((tech, index) => (
                        <Box key={index}>
                            {index > 0 && (
                                <Box sx={{ position: `relative`, left: `-35px`, top: `40px` }}>
                                    <DelInput index={index} removeItem={removeTechnology} />
                                </Box>
                            )}
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Technology name
                            </Typography>
                            <ModalInput placeholder="Technology name" item={tech.name} setItem={handleChangeTechnologies(index)} index={index} check={check} width={inputWidth} />
                            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                Type
                            </Typography>
                            <ModalSelect type={tech.type} setType={handleChangeType(index)} check={check} index={index} width={inputWidth} />
                        </Box>
                    ))}
                    {(editableTech === undefined) ? (
                        <>
                            <Box sx={{ mb: '35px', mt: '35px' }}>
                                <CustomButton variant="outlined" children='+ Add Technology' onClick={handleAddTechnology} />
                            </Box>
                            <Box>
                                <CustomButton variant="contained"
                                    children='Save Technology'
                                    onClick={() => {
                                        if (isError) setCheck(true);
                                        else (addTechnology())
                                    }}
                                />
                            </Box>
                        </>
                    ) : (
                        <Box sx={{ mb: '35px', mt: '35px' }}>
                            <CustomButton variant="contained"
                                children='Save Technology'
                                onClick={() => {
                                    if (isError) setCheck(true);
                                    else (editTechnology())
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </div>
        </Modal>
    )
}
export default TechModal