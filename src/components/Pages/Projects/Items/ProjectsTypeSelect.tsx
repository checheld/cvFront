import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTypedSelector } from '../../../../redusers/useTypedSelector';

interface IProjectsTypeSelect {
  setParam: (value: string) => void,
  width: number
}

const ProjectsTypeSelect: React.FC<IProjectsTypeSelect> = ({ setParam, width }) => {

  let progectTypes = useTypedSelector((state) => state.projectTypes.projectTypes);

  const handleChange = (event: SelectChangeEvent) => {
    setParam(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: width, ml: '15px', mr: '15px' }}>
        <Select
          displayEmpty
          defaultValue={""}
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={handleChange}
          sx={{ width: width, height: '45px', mb: '20px' }}
        >
          <MenuItem value="">
            <span style={{ color: `#a7aaac`, fontSize: `14px` }}>
              Type
            </span>
          </MenuItem>
          {
            progectTypes.map((x) => <MenuItem value={x.id}>{x.name}</MenuItem>)
          }
        </Select>
      </FormControl>
    </div>
  );
}
export default ProjectsTypeSelect