import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import styled from '@emotion/styled';

//  позволяет в кастомном элементе использовать все типы обычсного элемента
interface Iprops extends ButtonProps {
    variant: 'outlined' | 'contained',
    children?: React.ReactNode,
    onClick?: () => void,
}

const StyledButton = styled(Button)(() => ({
    height: '45px',
    // textTransform: 'capitalize',
    borderRadius: '5px',
    minWidth: '163px',
    width: 'auto',
    ['@media (max-width:426px)']: {
        width: '355px',
    },
    ['@media (max-width:376px)']: {
        width: '304px',
    }
}))

const CustomButton: React.FC<Iprops> = ({ variant, children, onClick }) => {
    return <StyledButton variant={variant}
        onClick={onClick}>
        {children}
    </StyledButton>
}
export default CustomButton
