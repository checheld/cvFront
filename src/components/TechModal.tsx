import React, { useEffect, useState } from 'react';
import CustomButton from './CustomButton';
import { useAppDispatch } from '../redusers/useTypedSelector';
import { Box, Modal, Typography } from '@mui/material';
import ModalSelect from './ModalSelect';
import { technologiesActions } from '../actionsTypes/technologiesActionTypes';
import SingleModalInput from './SingleModalInput';
import { ITechnology } from '../interfaces';

interface ITechModal {
    open: boolean,
    handleClose: () => void,
    editableTech?: ITechnology
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

const TechModal: React.FC<ITechModal> = ({open, handleClose, editableTech}) => {

    const [technology, setTechnology] = React.useState('');
    const [type, setType] = React.useState('');

    let isDisabled;
    if (editableTech === undefined) {
        isDisabled = ((technology !== '') && (type !== '')) ? true : false;
    } else {
        isDisabled = ((technology !== editableTech.name) || (type !== editableTech.type)) ? true : false;
    }

    const dispatch = useAppDispatch();
    const addTechnology = () => {
        const objTech = {'Name': technology, 'Type': type};
        dispatch( {type: technologiesActions.ADD_TECHNOLOGY_REQUEST, payload: objTech});
        setTechnology('');
        setType('');
        handleClose();
    }
    const editTechnology = () => {
        if(editableTech !== undefined) {
        const objTech = {'Name': technology, 'Type': type};
        dispatch( {type: technologiesActions.EDIT_TECHNOLOGY_REQUEST, id: editableTech.id, payload: objTech});
        setTechnology('');
        setType('');
        handleClose();
        }
    }
    useEffect(() => {
        if(editableTech !== undefined) {
            setTechnology(editableTech.name);
            setType(editableTech.type);
        }
    }, [editableTech]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
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
                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                        Technology name
                    </Typography>
                    <SingleModalInput placeholder="Technology" setItem={setTechnology} item={technology} />
                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                        Type
                    </Typography>
                    <ModalSelect type={type} setType={setType} />
                    {(editableTech === undefined) ? (
                        <Box>
                            <CustomButton variant="contained" onClick={addTechnology} children='Add Technology' disabled={!isDisabled} />
                        </Box>
                    ) : (
                        <Box>
                            <CustomButton variant="contained" onClick={editTechnology} children='Save Technology' disabled={!isDisabled} />
                        </Box>
                    )}
                </Box>
            </Box>
        </Modal>
    )
}
export default TechModal