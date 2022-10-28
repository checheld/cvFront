import React from 'react';
import { Paper, styled, Typography } from '@mui/material';
import { ITechnology } from '../../../../interfaces';
import ChipItem from './ChipItem';

interface IChip {
    techCollection: ITechnology[],
    handleEdit?: any,
    name: string,
    width: string
}

const TechContainer: React.FC<IChip> = ({ techCollection, handleEdit, name, width }) => {

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
        borderRadius: '10px',
        padding: '25px',
        width: width,
        ['@media (max-width:425px)']: {
            width: '355px',
        }
    }));

    return (
        <Item elevation={4}>
            <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#535E6C', mb: '15px' }}>{name}</Typography>
            <ChipItem techCollection={techCollection} handleEdit={handleEdit} />
        </Item>
    )
}
export default TechContainer