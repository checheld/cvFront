import { Box, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomButtonFixed from '../Items/CustomButtonFixed';
import ModalInput from '../Items/ModalInput';
import { useAppDispatch } from '../../redusers/useTypedSelector';
import CloseIcon from "@mui/icons-material/Close";

interface IEditModal {
  open: boolean,
  handleClose: () => void,
  item: { name: string, id: number },
  action: string,
  editName: string
}

const EditModal: React.FC<IEditModal> = ({ open, handleClose, item, action, editName }) => {
  const { id, name } = item;
  const [changedItem, setchangedItem] = useState(name);
  const dispatch = useAppDispatch();
  const updateItem = () => {
    (changedItem !== name) && dispatch({ type: action, payload: changedItem, id });
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <div className='modal'>
        <Box sx={{ m: '10px' }}>
          <Typography className='mainModalName'>
            Edit {editName}
          </Typography>
          <Box className='scrollContainer' sx={{pr: '40px'}}>
            <Typography className='inputTitle'>
              {editName}
            </Typography>
            <CloseIcon
              className='closeIcon'
              onClick={handleClose}
            />
            <ModalInput placeholder="Item" inputLength={55} item={changedItem} setItem={handleChange} />
          </Box>
          <Box sx={{ m: '30px 0 20px 40px' }}>
            <CustomButtonFixed variant="contained" children={`Save ${editName}`} onClick={updateItem} />
          </Box>
        </Box>
      </div>
    </Modal>
  )
}
export default EditModal