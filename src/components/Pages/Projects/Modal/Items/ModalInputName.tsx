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
    selectName?: string,
}

const CustomInput = styled(OutlinedInput)(() => ({
    width: '450px',
    height: 'auto',
    marginBottom: '0px',
    fontFamily: '"Nunito", sans-serif',
    ['@media (max-width:1024px)']: {
        width: '300px',
    },
    ['@media (max-width:425px)']: {
        width: '300px',
    },
    ['@media (max-width:375px)']: {
        width: '250px',
    }
}))

const ModalInputName: React.FC<Iprops> = ({ item, setItem, index, check, selectName }) => {

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
        <Box component="form" noValidate autoComplete="off" sx={{ mb: '25px' }}>
            <FormControl sx={{ mb: '0px' }}>
                <CustomInput placeholder='Project name'
                    name={selectName}
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

export default ModalInputName