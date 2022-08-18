import React, { ChangeEventHandler, useEffect } from 'react';
import { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Box, TextField } from '@mui/material';
import './DateField.css';

interface Iprops {
    item?: string,
    setItem?: ChangeEventHandler<HTMLInputElement>,
    index?: number,
    check?: boolean,
    label?: string,
    name?: string,
}

const DateField: React.FC<Iprops> = ({ item, setItem, index, check, label, name }) => {

    const currentDate = new Date();
    const currentDateYear = currentDate.getFullYear();
    const currentDateMonth = currentDate.getMonth() + 1;
    const currentDateDay = currentDate.getDate();
    const date = currentDateMonth > 10 ? `${currentDateYear}-${currentDateMonth}-${currentDateDay}` : `${currentDateYear}-0${currentDateMonth}-${currentDateDay}`;

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
                required
                error={item === '' && check && index === 0}
                id="date"
                label={label}
                type="date"
                defaultValue="2022-05-26"
                InputProps={{ inputProps: { min: "1950-01-01", max: `${date}` } }}
                sx={{ width: '130px', mr: '10px', fontSize: '14px !important', mb: 0 }}
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