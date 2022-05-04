import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Search from '../../img/Search';
import InputAdornment from '@mui/material/InputAdornment';

interface ISearchAttributes {
  setParam: (value: string) => void,
  placeholder: string
}

const UseFormControl:React.FC<ISearchAttributes> = ({ setParam, placeholder }) => {

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
        <OutlinedInput sx={{width:'300px'}} placeholder={placeholder} id="input-with-icon-adornment" onChange={handleChange}
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
