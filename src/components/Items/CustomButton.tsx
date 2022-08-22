import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

//  позволяет в кастомном элементе использовать все типы обычсного элемента
interface Iprops extends ButtonProps {
    variant: 'outlined' | 'contained',
    children?: React.ReactNode,
    onClick?: () => void,
    disabled?: boolean
}

const CustomButton: React.FC<Iprops> = ({ variant, children, onClick, disabled }) => {
    return <Button
        variant={variant}
        onClick={onClick}
        sx={{
            height: '45px',
            textTransform: 'capitalize',
            borderRadius: '5px',
            minWidth: '163px'
        }}
        disabled={disabled}>
        {children}
    </Button>
}
export default CustomButton
