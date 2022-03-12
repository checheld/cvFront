import React from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';


interface Iprops {
    placeholder: string,
    item?: string,
    setItem?: any,
    index?: number,
}

const ModalInput:React.FC<Iprops> = ({placeholder, item, setItem, index}) => {
  
  function MyFormHelperText() {
    const { focused } = useFormControl() || {};
  
    const helperText = React.useMemo(() => {
      if (item === '') {
        return 'Enter university, please';
      }
      return '';
    }, [focused]);
  
    return <FormHelperText sx={{color:'red'}}>{helperText}</FormHelperText>;
  }
  return (
    <Box component="form" noValidate autoComplete="off"sx={{mb:'25px', height: '50px' }}>
      <FormControl sx={{mb:'0px' }}>
        <OutlinedInput placeholder={placeholder}
                       id="input"
                       tabIndex={index}
                       value={item}
                       sx={{ width: '700px', mb: '0px' }} 
                       onChange={
                          setItem
                        }
                       />
        <MyFormHelperText />
      </FormControl>
    </Box>
  );
}

export default ModalInput