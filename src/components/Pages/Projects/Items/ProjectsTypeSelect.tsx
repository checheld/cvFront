import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTypedSelector } from '../../../../redusers/useTypedSelector';
import styled from '@emotion/styled';

interface IProjectsTypeSelect {
  setParam: any
}

const CustomSelect = styled(Select)(() => ({
  width: '160px',
  height: '45px',
  marginBottom: '20px',
  marginRight: '15px',
  ['@media (max-width:768px)']: {
    width: '140px',
  },
  ['@media (max-width:425px)']: {
    width: '140px',
    marginRight: '0px',
  },
  ['@media (max-width:375px)']: {
    width: '140px',
    marginRight: '0px',
  }
}))

const ProjectsTypeSelect: React.FC<IProjectsTypeSelect> = ({ setParam }) => {

  let progectTypes = useTypedSelector((state) => state.projectTypes.projectTypes);

  const handleChange = (event: any) => {
    setParam(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ ml: '15px' }}>
        <CustomSelect
          displayEmpty
          defaultValue={""}
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={handleChange}
          id='ProjectsTypeSelect'
        >
          <MenuItem value="">
            <span style={{ color: `#a7aaac`, fontSize: `14px` }}>
              Type
            </span>
          </MenuItem>
          {
            progectTypes.map((x, i) => <MenuItem value={x.id} key={i} data-cy={`${x.name}`}>{x.name}</MenuItem>)
          }
        </CustomSelect>
      </FormControl>
    </div>
  );
}
export default ProjectsTypeSelect