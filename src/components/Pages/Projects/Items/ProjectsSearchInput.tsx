import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Search from '../../../../img/Search';
import InputAdornment from '@mui/material/InputAdornment';
import styled from '@emotion/styled';

interface ISearchAttributes {
    setParam: (value: string) => void,
    placeholder: string,
}

const CustomInput = styled(OutlinedInput)(() => ({
    height: '45px',
    width: '300px',
    ['@media (max-width:1024px)']: {
        width: '160px',
    },
    ['@media (max-width:768px)']: {
        width: '210px',
    },
    ['@media (max-width:425px)']: {
        width: '200px',
    },
    ['@media (max-width:375px)']: {
        width: '150px',
    }
}))

const ProjectsSearchInput: React.FC<ISearchAttributes> = ({ setParam, placeholder }) => {

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        const inputValue = value;
        setParam(inputValue);
    };

    return (
        <Box component="form" noValidate autoComplete="off">
            <FormControl>
                <CustomInput placeholder={placeholder}
                    inputProps={{ maxLength: 15 }}
                    id="input-with-icon-adornment"
                    onChange={handleChange}
                    startAdornment={
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>}
                />
            </FormControl>
        </Box>
    );
}

export default ProjectsSearchInput
