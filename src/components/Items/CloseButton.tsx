import * as React from 'react';
import Close from '../../img/Close';
import Button from '@mui/material/Button';

export default function CloseButton() {
    return (
    <Button variant='text' sx={{minWidth: '15px', padding: '-0px', ml: '-8px', mr: '8px'}}>
        <Close />
    </Button>
    );
}
