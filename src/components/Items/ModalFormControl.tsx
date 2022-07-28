import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

interface ISelect {
    type: string,
    setType: any,
    check: boolean,
    index: number,
    width?: number,
    height?: number,
    placeholder: string,
    elements: any,
    selectName: string
}

const ModalFormControl: React.FC<ISelect> = ({ elements, selectName, type, setType, check, index, width, height, placeholder }) => {

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
            <Select
                name={selectName}
                defaultValue={""}
                value={type}
                error={type === '' && check && index === 0}
                onChange={setType}
                sx={{ width: { width }, height: { height }, mb: 0 }}
                displayEmpty
            >
                <MenuItem value="">
                    <span style={{ color: `#a7aaac`, fontSize: `14px` }}>
                        Select {placeholder}
                    </span>
                </MenuItem>
                {
                    (selectName === 'userId') ? (elements.map((el: any) => <MenuItem value={el.id}>{el.firstName} {el.lastName}</MenuItem>)) :
                        (elements.map((el: any) => <MenuItem value={el.id}>{el.name}</MenuItem>))

                }
            </Select>
            <MyFormHelperText />
        </FormControl>
    );
}
export default ModalFormControl