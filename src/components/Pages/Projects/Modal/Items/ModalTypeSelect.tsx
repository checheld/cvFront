import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTypedSelector } from '../../../../../redusers/useTypedSelector';
import { FormHelperText, styled } from '@mui/material';

interface IChipSelect {
    type: string,
    setType: any,
    check?: boolean,
}

const CustomSelect = styled(Select)(() => ({
    width: '230px',
    height: '50px',
    marginBottom: '0px',
    ['@media (max-width:1024px)']: {
        width: '185px',
    },
    ['@media (max-width:425px)']: {
        width: '300px',
    },
    ['@media (max-width:375px)']: {
        width: '250px',
    }
}))

const ModalTypeSelect: React.FC<IChipSelect> = ({ type, setType, check }) => {

    const projectTypes = useTypedSelector((state) => state.projectTypes.projectTypes);

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
            onChange={setType}
            defaultValue={""}
            error={!type && check}
            displayEmpty
        >
            <MenuItem value="">
                <span style={{ color: `#a7aaac`, fontSize: `14px` }}>
                    Select type
                </span>
            </MenuItem>
            {
                projectTypes.map((x, i) => <MenuItem value={x.id} key={i} >{x.name}</MenuItem>)
            }
        </CustomSelect>
        <MyFormHelperText />
    </FormControl>
    );
}
export default ModalTypeSelect