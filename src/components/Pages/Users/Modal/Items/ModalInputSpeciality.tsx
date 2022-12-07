import React, { ChangeEventHandler } from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import styled from '@emotion/styled';

interface Iprops {
    item?: string,
    setItem?: ChangeEventHandler<HTMLInputElement>,
    index?: number,
    check?: boolean,
}

const CustomInput = styled(OutlinedInput)(() => ({
    width: '410px',
    height: 'auto',
    marginBottom: '0px',
    fontFamily: '"Nunito", sans-serif',
    ['@media (max-width:1025px)']: {
        width: '215px',
    },
    ['@media (max-width:426px)']: {
        width: '300px',
    },
    ['@media (max-width:376px)']: {
        width: '250px',
    }
}))

const ModalInputSpeciality: React.FC<Iprops> = ({ item, setItem, index, check }) => {

    function MyFormHelperText() {
        const { focused } = useFormControl() || {};

        const helperText: string = React.useMemo(() => {
            if (!item && check && index === 0) {
                return 'Empty field';
            }
            return '';
        }, [focused]);

        return <FormHelperText sx={{ color: 'red' }}>{helperText}</FormHelperText>;
    }

    return (
        <Box component="form" noValidate autoComplete="off" sx={{ mb: '25px', height: 50 }}>
            <FormControl sx={{ mb: '0px' }}>
                <CustomInput placeholder='Speciality'
                    name='speciality'
                    inputProps={{ maxLength: 55 }}
                    id="input"
                    tabIndex={index}
                    value={item}
                    error={!item && check && index === 0}
                    onChange={setItem}
                />
                <MyFormHelperText />
            </FormControl>
        </Box>
    );
}

export default ModalInputSpeciality