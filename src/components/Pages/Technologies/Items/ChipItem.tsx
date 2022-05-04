import React from 'react';
import { Chip, Stack } from '@mui/material';
import { ITechnology } from '../../../../interfaces';
import { technologiesActions } from '../../../../actionsTypes/technologiesActionTypes';
import { useAppDispatch } from '../../../../redusers/useTypedSelector';
import AddModal from '../Modal/TechModal';

interface IChip{
    techCollection: ITechnology[],  
}

const ChipItem: React.FC<IChip> = ({ techCollection}) => {
    const [editableTech, setEditableTech] = React.useState<ITechnology>();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();
    const handleDelete = (id: string) => {
        dispatch( {type: technologiesActions.DEL_TECHNOLOGY_REQUEST, payload: id});
    };
    const handleClick = (tech: ITechnology) => {
        setEditableTech(tech);
        handleOpen();
    };

    return (
        <>
            <AddModal open={open} handleClose={handleClose} editableTech={editableTech}/>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {techCollection.map((tech) => (
                    <Chip label={tech.name}
                        onDelete={() => handleDelete(tech.id)}
                        onClick={() => handleClick(tech)}
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
        </>
    )
}
export default ChipItem