import { Box, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomButton from '../Items/CustomButton';
import ModalInput from '../Items/ModalInput';
import { useAppDispatch } from '../../redusers/useTypedSelector';
import CloseIcon from "@mui/icons-material/Close";

interface IEditModal {
  open: boolean,
  handleClose: () => void,
  item: { name: string, id: string },
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

  const screenWidth = window.screen.width;
  const [inputWidth, setInputWidth] = useState<number>();

  useEffect(() => {
    if (screenWidth <= 1024 && screenWidth > 425) {
      setInputWidth(500)
    } else if (screenWidth < 426) {
      setInputWidth(300)
    } else setInputWidth(700)
  }, [screenWidth]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ overflow: 'scroll' }}
    >
      <div className='modalContainer'>
        <Box sx={{ m: '50px' }}>
          <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
            Edit {editName}
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
            {editName}
          </Typography>
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
          <ModalInput placeholder="Item" inputLength={15} item={changedItem} setItem={handleChange} width={inputWidth} />
          <Box>
            <CustomButton variant="contained" children={`Save ${editName}`} onClick={updateItem} />
          </Box>
        </Box>
      </div>
    </Modal>
  )
}
export default EditModal