import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTypedSelector } from '../../../../redusers/useTypedSelector';

interface IProjectsTechSelect {
    setParam: (value: string) => void,
    width: number
}

const ProjectsTechSelect: React.FC<IProjectsTechSelect> = ({ setParam, width }) => {

    let technologies = useTypedSelector((state) => state.technologies.technologies);
    const handleChange = (event: SelectChangeEvent) => {
        setParam(event.target.value);
    };

    const [widthMargin, setWidthMargin] = useState<string>();
    useEffect(() => {
        if (width < 426) {
            setWidthMargin('0px')
        } else {
            setWidthMargin('15px')
        }
    }, [width]);

    return (
        <div>
            <FormControl sx={{ width: width, ml: widthMargin }}>
                <Select
                    displayEmpty
                    defaultValue={""}
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={handleChange}
                    sx={{ width: width, height: '45px', mb: '20px' }}
                >
                    <MenuItem value="">
                        <span style={{ color: `#a7aaac`, fontSize: `14px` }}>
                            Technologies
                        </span>
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