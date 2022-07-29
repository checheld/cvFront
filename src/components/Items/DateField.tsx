import React, { ChangeEventHandler } from 'react';
import { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Box, TextField } from '@mui/material';


interface Iprops {
    item?: string,
    setItem?: ChangeEventHandler<HTMLInputElement>,
    index?: number,
    check?: boolean,
    label?: string,
    name?: string,
}

const DateField: React.FC<Iprops> = ({ item, setItem, index, check, label, name }) => {

    function MyFormHelperText() {
        const { focused } = useFormControl() || {};

        const helperText: string = React.useMemo(() => {
            if (!item && check && index === 0) {
                return 'Empty field';
            }
            return '';
        }, [focused]);

        return <FormHelperText style={{ color: 'red', marginLeft: '12px' }}>{helperText}</FormHelperText>;
    }

    return (
        <Box sx={{ m: 0 }}>
            <TextField
                error={item === '' && check && index === 0}
                id="date"
                label={label}
                type="date"
                defaultValue="2022-05-26"
                InputProps={{ inputProps: { min: "1950-01-01", max: "2022-05-04" } }}
                sx={{ width: '130px', height: '47px', mr: '10px', fontSize: '14px !important', mb: 0 }}
                InputLabelProps={{
                    shrink: true,
                }}
                name={name}
                value={item}
                onChange={setItem}
            />
            <MyFormHelperText />
        </Box>
    );
}

export default DateField