import React from 'react';
import { Chip, Stack } from '@mui/material';
import { ITechnology } from '../interfaces';
import CloseButton from './CloseButton';
import { technologiesActions } from '../actionsTypes/technologiesActionTypes';
import { useAppDispatch } from '../redusers/useTypedSelector';

interface IChip{
    techCollection: ITechnology[],
    handleClick: () => void,
   
}

const ChipItem: React.FC<IChip> = ({ techCollection, handleClick}) => {
    const dispatch = useAppDispatch();
    const handleDelete = (id: string) => {
        dispatch( {type: technologiesActions.DEL_TECHNOLOGY_REQUEST, payload: id});
        console.info(id);
    };
    
    return (
        <Stack sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
        }}>
            {techCollection.map((tech) => (
                <Chip label={tech.name}
                    onDelete={ () => handleDelete(tech.id) }
                    onClick={handleClick}
                    id={tech.id}
                    style={{
                        backgroundColor: '#F0F2F5',
                        color: '#9EA9BA',
                        borderRadius: '30px',
                        marginRight: '10px',
                        marginBottom: '10px',
                        padding: '0px'
                    }} />
            ))}
        </Stack>
    )
}
export default ChipItem