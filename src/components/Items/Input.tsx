import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Search from '../../img/Search';
import InputAdornment from '@mui/material/InputAdornment';
import styled from '@emotion/styled';

interface ISearchAttributes {
  setParam: (value: string) => void,
  placeholder: string,
}

const CustomInput = styled(OutlinedInput)(() => ({
  height: '45px',
  width: '300px',
  ['@media (max-width:768px)']: {
    width: '300px',
  },
  ['@media (max-width:425px)']: {
    width: '355px',
  },
  ['@media (max-width:375px)']: {
    width: '304px',
  }
}))

const UseFormControl: React.FC<ISearchAttributes> = ({ setParam, placeholder }) => {

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
          inputProps={{ maxLength: 55 }}
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

export default UseFormControl
