import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText, styled } from '@mui/material';

interface ISelect {
    type: string,
    setType: any,
    check: boolean,
    index: number,
    elements: any,
    placeholder: string,
    selectName: string
}

const CustomSelect = styled(Select)(() => ({
    height: '50px',
    width: '195px',
    marginBottom: '0px',
    ['@media (max-width:1024px)']: {
        width: '505px',
    },
    ['@media (max-width:425px)']: {
        width: '300px',
    },
    ['@media (max-width:375px)']: {
        width: '250px',
    }
}))

const ModalFormControlSmall: React.FC<ISelect> = ({ elements, type, setType, check, index, selectName, placeholder }) => {

    function MyFormHelperText() {
        const { focused } = useFormControl() || {};

        const helperText: string = React.useMemo(() => {
            if (!type && check && index === 0) {
                return 'Empty field';
            }
            return '';
        }, [focused]);

        return <FormHelperText sx={{ color: 'red' }}>{helperText}</FormHelperText>;
    }

    return (
        <FormControl sx={{ mb: '20px' }}>
            <CustomSelect
                name={selectName}
                defaultValue={""}
                value={type}
                error={type === '' && check && index === 0}
                onChange={setType}
                displayEmpty
            >
                <MenuItem value="">
                    <span style={{ color: `#a7aaac`, fontSize: `14px` }}>
                        Select {placeholder}
                    </span>
                </MenuItem>
                {
                    elements.map((el: any, key: number) => <MenuItem value={el.id} key={key}>{el.name}</MenuItem>)
                }
            </CustomSelect>
            <MyFormHelperText />
        </FormControl>
    );
}
export default ModalFormControlSmall