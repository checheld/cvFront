import { Box, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomButtonFixed from '../Items/CustomButtonFixed';
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

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div className='modal'>
                <Box sx={{ m: '10px' }}>
                    <Typography className='mainModalName'>
                        Add {addName}
                    </Typography>
                    <Box className='scrollContainer' sx={{pr: '40px'}}>
                        <Typography className='inputTitle'>
                            {addName}
                        </Typography>
                        <CloseIcon
                            className='closeIcon'
                            onClick={handleClose}
                        />
                        {arrayItems.length && arrayItems.map((item, index) => (
                            <Box key={index}>
                                {index > 0 && (
                                    <Box sx={{ position: 'relative', left: '-35px', top: '42px' }}>
                                        <DelInput index={index} removeItem={removeItem} />
                                    </Box>
                                )}
                                <ModalInput placeholder={`${addName} name`} item={item} inputLength={55} setItem={handleChangeItems(index)} index={index} check={check} />
                            </Box>
                        ))}
                        <Box sx={{ mb: '20px' }}>
                            <CustomButtonFixed variant="outlined" children={`+ Add ${addName}`} onClick={handleAddItem} />
                        </Box>
                    </Box>
                    <Box sx={{ m: '30px 0 20px 40px' }}>
                        <CustomButtonFixed variant="contained"
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