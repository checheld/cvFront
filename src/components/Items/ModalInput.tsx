import React, { ChangeEventHandler, useState } from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';


interface Iprops {
  placeholder: string,
  item?: string,
  setItem?: ChangeEventHandler<HTMLInputElement>,
  index?: number,
  check?: boolean,
  width?: string | number,
  height?: number,
  selectName?: string,
  inputLength: number
}

const ModalInput: React.FC<Iprops> = ({ placeholder, item, setItem, index, check, width, height, selectName, inputLength }) => {

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
    <Box component="form" noValidate autoComplete="off" sx={{ mb: '25px', height: height }}>
      <FormControl sx={{ mb: '0px' }}>
        <OutlinedInput placeholder={placeholder}
          name={selectName}
          inputProps={{ maxLength: inputLength }}
          id="input"
          tabIndex={index}
          value={item}
          error={!item && check && index === 0}
          sx={{ width: { width }, height: { height }, mb: '0px', fontFamily: '"Nunito", sans-serif' }}
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