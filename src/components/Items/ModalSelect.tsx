import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText, styled } from '@mui/material';

interface ISelect {
  type: string,
  setType: any,
  check: boolean,
  index: number,
  width?: number,
  height?: number
}

const CustomSelect = styled(Select)(() => ({
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

const ModalSelect: React.FC<ISelect> = ({ type, setType, check, index }) => {
  // const handleChange = (event: SelectChangeEvent) => {
  //   setType(items[event.target.value]);
  // };
  const items = ['Front-end', 'Back-end', 'Databases', 'Hosting', 'Other', 'Soft skills'];

  function MyFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText: string = React.useMemo(() => {
      if (!type && check && index === 0) {
        return 'Empty field';
      }
      return '';
    }, [focused]);

    return <FormHelperText sx={{ color: 'red' }}>{helperText}</FormHelperText>;
  }

  return (
    <div>
      <FormControl>
        <CustomSelect
          value={type}
          onChange={setType}
          id={`select${index}`}
          error={!type && check && index === 0}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <span style={{ color: `#a7aaac`, fontSize: `14px`, fontFamily: '"Nunito", sans-serif' }}>
              Select type
            </span>
          </MenuItem>
          {
            items.map((x, key: number) => <MenuItem value={x.toLowerCase()} key={key} data-cy={`${x}`}>{x}</MenuItem>)
          }
        </CustomSelect>
        <MyFormHelperText />
      </FormControl>
    </div>
  );
}
export default ModalSelect