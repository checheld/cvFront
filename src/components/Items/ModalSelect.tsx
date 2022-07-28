import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

interface ISelect {
  type: string,
  setType: any,
  check: boolean,
  index: number,
  width?: number,
  height?: number
}

const ModalSelect: React.FC<ISelect> = ({ type, setType, check, index, width, height }) => {
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
        <Select
          value={type}
          onChange={setType}
          error={!type && check && index === 0}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ width: { width }, height: { height }, mb: 0 }}
        >
          <MenuItem value="">
            <span style={{ color: `#a7aaac`, fontSize: `14px` }}>
              Select type
            </span>
          </MenuItem>
          {
            items.map((x) => <MenuItem value={x.toLowerCase()}>{x}</MenuItem>)
          }
        </Select>
        <MyFormHelperText />
      </FormControl>
    </div>
  );
}
export default ModalSelect