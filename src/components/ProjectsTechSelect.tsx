import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTypedSelector } from '../redusers/useTypedSelector';

interface IProjectsTechSelect {
    setParam: (value: string) => void,
  }  

const ProjectsTechSelect: React.FC<IProjectsTechSelect> = ({ setParam }) => {
    
    let technologies = useTypedSelector((state) => state.technologies.technologies);
    const handleChange = (event: SelectChangeEvent) => {
        setParam(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ width: '190px', ml: '15px' }}>
                <Select
                    displayEmpty
                    defaultValue={""}
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={handleChange}
                    sx={{ width: '190px', height: '45px', mb: '20px' }}
                >
                    <MenuItem value="">
                        <em>Technology</em>
                    </MenuItem>
                    {
                        technologies.map((tech) => <MenuItem value={tech.name}>{tech.name}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </div>
    );
}
export default ProjectsTechSelect