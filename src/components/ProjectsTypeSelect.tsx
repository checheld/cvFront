import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ProjectsTypeSelect: React.FC = () => {
  
  const items = ['CRM', 'Web service', 'Web site'];

  return (
    <div>
      <FormControl sx={{width: '160px', ml: '15px'}}>
        <Select
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{width: '160px',height: '45px', mb: '20px'}}
        >
          <MenuItem value="">
            <em>Type</em>
          </MenuItem>
          {
            items.map((x) => <MenuItem value={x.toLowerCase()}>{x}</MenuItem>)
          }
        </Select>
      </FormControl>
    </div>
  );
}
export default ProjectsTypeSelect