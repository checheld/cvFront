import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IProjectsTypeSelect {
  setParam: (value: string) => void,
}

const ProjectsTypeSelect: React.FC<IProjectsTypeSelect> = ({ setParam }) => {
  
  const items = ['CRM', 'Web service', 'Web site'];

  const handleChange = (event: SelectChangeEvent) => {
    setParam(event.target.value);
};

  return (
    <div>
      <FormControl sx={{width: '160px', ml: '15px'}}>
        <Select
          displayEmpty
          defaultValue={""}
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={handleChange}
          sx={{width: '160px',height: '45px', mb: '20px'}}
        >
          <MenuItem value="">
            <em>Type</em>
          </MenuItem>
          {
            items.map((x) => <MenuItem value={x}>{x}</MenuItem>)
          }
        </Select>
      </FormControl>
    </div>
  );
}
export default ProjectsTypeSelect