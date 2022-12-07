import React, { ChangeEventHandler } from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

interface Iprops {
    item?: string,
    setItem?: ChangeEventHandler<HTMLInputElement>,
    index?: number,
    selectName?: string,
}

const CustomInput = styled(OutlinedInput)(() => ({
    width: '430px',
    height: 'auto',
    marginBottom: '0px',
    fontFamily: '"Nunito", sans-serif',
    ['@media (max-width:1025px)']: {
        width: '300px',
    },
    ['@media (max-width:426px)']: {
        width: '300px',
    },
    ['@media (max-width:376px)']: {
        width: '250px',
    }
}))

const ModalInputLink: React.FC<Iprops> = ({ item, setItem, index, selectName }) => {

    return (
        <Box component="form" noValidate autoComplete="off" sx={{ mb: '25px' }}>
            <FormControl sx={{ mb: '0px' }}>
                <CustomInput placeholder='Link'
                    name={selectName}
                    inputProps={{ maxLength: 55 }}
                    id="input"
                    tabIndex={index}
                    value={item}
                    onChange={setItem}
                />
            </FormControl>
        </Box>
    );
}

export default ModalInputLink