import { Box, Modal, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import CustomButton from '../Items/CustomButton';
import ModalInput from '../Items/ModalInput';
import { useAppDispatch } from '../../redusers/useTypedSelector';

interface IEditModal {
    open: boolean,
    handleClose: () => void,
    item: {name: string, id: string},
    action: string
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

const EditModal: React.FC<IEditModal> = ({ open, handleClose, item, action}) => {
  const {id, name} = item;
  const [changedItem, setchangedItem] = React.useState(name);  
  const dispatch = useAppDispatch();
  const updateItem = () => {
    dispatch( {type: action, payload: changedItem, id});
    handleClose()
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const {
        target: { value },
      } = ev;
      setchangedItem(value);
    };

  useEffect(() => {
    setchangedItem(name)
  }, [name])

  const isDisabled = changedItem === name ? true : false;

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
              Edit Item
            </Typography>
            <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
              Item
            </Typography>
            <ModalInput placeholder="Item" item={changedItem} setItem={handleChange}/>
            <Box>
              <CustomButton variant="contained" children='Save Item' disabled={isDisabled} onClick={updateItem}/>
            </Box>
          </Box>
        </Box>
      </Modal>
    )
}
export default EditModal