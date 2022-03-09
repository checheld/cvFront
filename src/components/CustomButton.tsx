import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

//  позволяет в кастомном элементе использовать все типы обычсного элемента
interface Iprops extends ButtonProps{
    variant: 'outlined' | 'contained',
    children?: React.ReactNode
}

const CustomButton: React.FC<Iprops> = ({variant, children}) => {
    return <Button variant={variant}>{children}</Button>
  }
  export default CustomButton
  