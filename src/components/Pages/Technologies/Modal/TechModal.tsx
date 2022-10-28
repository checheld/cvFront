import React, { useEffect, useState } from 'react';
import CustomButtonFixed from '../../../Items/CustomButtonFixed';
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

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div className='modal'>
                <Box sx={{ m: '10px' }}>
                    {(editableTech === undefined) ? (
                        <Typography className='mainModalName'>
                            Add Technology
                        </Typography>
                    ) : (
                        <Typography className='mainModalName'>
                            Edit Technology
                        </Typography>
                    )}
                    <CloseIcon
                        className='closeIcon'
                        onClick={handleClose}
                    />
                    <Box className='scrollContainer'>
                        <Box sx={{ mb: '35px' }}>
                            {arrayTechnologies.length && arrayTechnologies.map((tech, index) => (
                                <Box key={index}>
                                    {index > 0 && (
                                        <Box sx={{ position: `relative`, left: `-35px`, top: `30px` }}>
                                            <DelInput index={index} removeItem={removeTechnology} />
                                        </Box>
                                    )}
                                    <Typography className='inputTitle'>
                                        Technology name
                                    </Typography>
                                    <ModalInput placeholder="Technology name" inputLength={15} item={tech.name} setItem={handleChangeTechnologies(index)} index={index} check={check} />
                                    <Typography className='inputTitle'>
                                        Type
                                    </Typography>
                                    <ModalSelect type={tech.type} setType={handleChangeType(index)} check={check} index={index} />
                                </Box>
                            ))}
                        </Box>
                        {(editableTech === undefined) && (
                            <Box sx={{ mb: '35px' }}>
                                <CustomButtonFixed variant="outlined" children='+ Add Technology' onClick={handleAddTechnology} />
                            </Box>
                        )}
                    </Box>
                    {(editableTech === undefined) ? (
                        <Box sx={{ m: '30px 0 20px 40px' }}>
                            <CustomButtonFixed variant="contained"
                                children='Save Technology'
                                onClick={() => {
                                    if (isError) setCheck(true);
                                    else (addTechnology())
                                }}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ m: '30px 0 20px 40px' }}>
                            <CustomButtonFixed variant="contained"
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