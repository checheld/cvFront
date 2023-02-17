import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTypedSelector } from '../../../../../redusers/useTypedSelector';
import { FormHelperText, styled } from '@mui/material';

interface IChipSelect {
    type: number,
    setType: any,
    check?: boolean,
}

const CustomSelect = styled(Select)(() => ({
    width: '230px',
    height: '50px',
    marginBottom: '0px',
    ['@media (max-width:1025px)']: {
        width: '185px',
    },
    ['@media (max-width:426px)']: {
        width: '300px',
    },
    ['@media (max-width:376px)']: {
        width: '250px',
    }
}))

const ModalTypeSelect: React.FC<IChipSelect> = ({ type, setType, check }) => {

    const projectTypes = useTypedSelector((state) => state.projectTypes.projectTypes);

    const handleChange = (event: any) => {
        setType(event.target.value);
    };

    function MyFormHelperText() {
        const { focused } = useFormControl() || {};

        const helperText: string = React.useMemo(() => {
            if (check && !type) {
                return 'Empty field';
            }
            return '';
        }, [focused]);

        return <FormHelperText sx={{ color: 'red' }}>{helperText}</FormHelperText>;
    }

    return (<FormControl>
        <CustomSelect
            value={type}
            onChange={handleChange}
            id='typeSelect'
            error={!type && check}
            displayEmpty
        >
            <MenuItem value="">
                <span style={{ color: `#a7aaac`, fontSize: `14px` }}>
                    Select type
                </span>
            </MenuItem>
            {
                projectTypes.map((x, key: number) => <MenuItem value={x.id} key={key} data-cy={`${x.name}`}>{x.name}</MenuItem>)
            }
        </CustomSelect>
        <MyFormHelperText />
    </FormControl>
    );
}
export default ModalTypeSelect