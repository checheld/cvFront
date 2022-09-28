import React, { ChangeEventHandler } from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import styled from '@emotion/styled';

interface Iprops {
  placeholder: string,
  item?: string,
  setItem?: ChangeEventHandler<HTMLInputElement>,
  index?: number,
  check?: boolean,
  height?: number,
  selectName?: string,
  inputLength: number
}

const CustomInput = styled(OutlinedInput)(() => ({
  width: '700px',
  height: 'auto',
  marginBottom: '0px',
  fontFamily: '"Nunito", sans-serif',
  ['@media (max-width:1024px)']: {
    width: '500px',
  },
  ['@media (max-width:425px)']: {
    width: '300px',
  },
  ['@media (max-width:375px)']: {
    width: '250px',
  }
}))

const CustomInputDescription = styled(OutlinedInput)(() => ({
  width: '700px',
  height: '100px',
  marginBottom: '0px',
  fontFamily: '"Nunito", sans-serif',
  ['@media (max-width:1024px)']: {
    width: '500px',
  },
  ['@media (max-width:425px)']: {
    width: '300px',
  },
  ['@media (max-width:375px)']: {
    width: '250px',
  }
}))

const ModalInput: React.FC<Iprops> = ({ placeholder, item, setItem, index, check, height, selectName, inputLength }) => {

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
        {(height === 100) ? (
          <CustomInputDescription placeholder={placeholder}
            name={selectName}
            inputProps={{ maxLength: inputLength }}
            id="input"
            tabIndex={index}
            value={item}
            error={!item && check && index === 0}
            onChange={setItem}
          />
        ) : (
          <CustomInput placeholder={placeholder}
            name={selectName}
            inputProps={{ maxLength: inputLength }}
            id="input"
            tabIndex={index}
            value={item}
            error={!item && check && index === 0}
            onChange={setItem}
          />
        )}

        <MyFormHelperText />
      </FormControl>
    </Box>
  );
}

export default ModalInput