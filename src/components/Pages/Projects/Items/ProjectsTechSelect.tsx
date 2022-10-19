import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTypedSelector } from '../../../../redusers/useTypedSelector';
import styled from '@emotion/styled';

interface IProjectsTechSelect {
    setParam: any
}

const CustomSelect = styled(Select)(() => ({
    width: '190px',
    height: '45px',
    marginBottom: '20px',
    ['@media (max-width:768px)']: {
        width: '140px',
    },
    ['@media (max-width:425px)']: {
        width: '175px',
    },
    ['@media (max-width:375px)']: {
        width: '125px',
    }
}))

const CustomFormControl = styled(FormControl)(() => ({
    width: '190px',
    // marginLeft: '15px',
    ['@media (max-width:768px)']: {
        width: '140px',
    },
    ['@media (max-width:425px)']: {
        width: '175px',
        marginLeft: '0px',
    },
    ['@media (max-width:375px)']: {
        width: '125px',
        marginLeft: '0px',
    }
}))

const ProjectsTechSelect: React.FC<IProjectsTechSelect> = ({ setParam }) => {

    let technologies = useTypedSelector((state) => state.technologies.technologies);

    const handleChange = (event: any) => {
        setParam(event.target.value);
    };

    return (
        <div>
            <CustomFormControl>
                <CustomSelect
                    displayEmpty
                    defaultValue={""}
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={handleChange}
                    id='ProjectsTechSelect'
                >
                    <MenuItem value="">
                        <span style={{ color: `#a7aaac`, fontSize: `14px` }}>
                            Technologies
                        </span>
                    </MenuItem>
                    {
                        technologies.map((tech, i) => <MenuItem value={tech.name} key={i} data-cy={`${tech.name}`}>{tech.name}</MenuItem>)
                    }
                </CustomSelect>
            </CustomFormControl>
        </div>
    );
}
export default ProjectsTechSelect