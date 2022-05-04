import React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';

interface Iprops {
    placeholder: string,
    setItem: (value: string) => void,
    item?: string
}

const SingleModalInput: React.FC<Iprops> = ({ placeholder, setItem, item }) => {

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        setItem(value);
    };

    return (
        <Box component="form" noValidate autoComplete="off" sx={{ mb: '25px', height: '50px' }}>
            <FormControl sx={{ mb: '0px' }}>
                <OutlinedInput placeholder={placeholder}
                    value={item}
                    id="input"
                    sx={{ width: '700px', mb: '0px', height: '45px' }}
                    onChange={
                        handleChange
                    }
                />
            </FormControl>
        </Box>
    );
}

export default SingleModalInput