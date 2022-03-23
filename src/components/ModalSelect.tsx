import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ISelect {
  type: string,
  setType: (value: string) => void,
}

const SelectLabels: React.FC<ISelect> = ({ type, setType }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };
  const items = ['Front-end', 'Back-end', 'Databases', 'Hosting', 'Other', 'Soft skills'];

  return (
    <div>
      <FormControl>
        <Select
          value={type}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{width:'700px', height: '45px', mb: '20px'}}
        >
          <MenuItem value="">
            <em>Select type</em>
          </MenuItem>
          {
            items.map((x) => <MenuItem value={x.toLowerCase()}>{x}</MenuItem>)
          }
        </Select>
      </FormControl>
    </div>
  );
}
export default SelectLabels