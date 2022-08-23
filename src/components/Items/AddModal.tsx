import { Box, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomButton from '../Items/CustomButton';
import ModalInput from '../Items/ModalInput';
import { useAppDispatch } from '../../redusers/useTypedSelector';
import CloseIcon from "@mui/icons-material/Close";
import DelInput from '../../img/DelInput'
import '../Components.css';

interface IAddModal {
    open: boolean,
    handleClose: () => void,
    action: string,
    addName: string
}

const AddModal: React.FC<IAddModal> = ({ open, handleClose, action, addName }) => {

    const dispatch = useAppDispatch();

    const [arrayItems, setArrayItems] = React.useState([""])
    const [item] = React.useState('');
    const handleChangeItems =
        (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const editedArr = [...arrayItems];
            editedArr[index as number] = event.target.value;
            setArrayItems(editedArr);
        };

    const removeItem = (index: number): void => {
        setArrayItems([...arrayItems.slice(0, index), ...arrayItems.slice(index + 1)]);
    };

    const addItem = () => {
        const clearArrayItems = arrayItems.filter(el => el != "")
        const objArr = clearArrayItems.map(e => ({ 'Name': e }));
        dispatch({ type: action, payload: objArr });
        setArrayItems(['']);
        handleClose();
    }
    const handleAddItem = () => setArrayItems([...arrayItems, item]);

    const [check, setCheck] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
        !arrayItems[0] && setIsError(true);
    }, [arrayItems]);

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
            style={{ overflow: 'scroll' }}
        >
            <div className='modalContainer'>
                <Box sx={{ m: '50px' }}>
                    <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
                        Add {addName}
                    </Typography>
                    <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                        {addName}
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
                    {arrayItems.length && arrayItems.map((item, index) => (
                        <Box key={index}>
                            {index > 0 && (
                                <Box sx={{ position: `relative`, left: `-35px`, top: `40px` }}>
                                    <DelInput index={index} removeItem={removeItem} />
                                </Box>
                            )}
                            <ModalInput placeholder={`${addName} name`} item={item} setItem={handleChangeItems(index)} index={index} check={check} width={inputWidth} />
                        </Box>
                    ))}
                    <Box sx={{ mb: '35px' }}>
                        <CustomButton variant="outlined" children={`+ Add ${addName}`} onClick={handleAddItem} />
                    </Box>
                    <Box>
                        <CustomButton variant="contained"
                            children={`Save ${addName}`}
                            onClick={() => {
                                if (isError) setCheck(true);
                                else (addItem())
                            }}
                        />
                    </Box>
                </Box>
            </div>
        </Modal>
    )
}
export default AddModal