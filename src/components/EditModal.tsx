import { Box, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { universitiesActions } from '../actionsTypes/universitiesActionTypes';
import CustomButton from '../components/CustomButton';
import ModalInput from '../components/ModalInput';
import { useAppDispatch } from '../redusers/useTypedSelector';

interface IEditModal {
    open: boolean,
    handleClose?: () => void,
    university: {name: string, id: string}
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

const EditModal: React.FC<IEditModal> = ({ open, handleClose, university}) => {
  const name = university.name;
  const [changedUniversity, setchangedUniversity] = React.useState( name );  
  const dispatch = useAppDispatch();
  const updateUniversity = () => {
    dispatch( {type: universitiesActions.EDIT_UNIVERSITY_REQUEST, payload: university});
}

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ m: '50px' }}>
            <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
              Edit University
            </Typography>
            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
              University
            </Typography>
            <ModalInput placeholder="University" item={changedUniversity} setItem={setchangedUniversity}/>
            <Box>
              <CustomButton variant="contained" children='Save University' disabled={false} onClick={updateUniversity}/>
            </Box>
          </Box>
        </Box>
      </Modal>
    )
}
export default EditModal