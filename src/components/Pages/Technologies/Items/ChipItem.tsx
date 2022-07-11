import React from 'react';
import { Chip, Stack } from '@mui/material';
import { ITechnology } from '../../../../interfaces';
import { technologiesActions } from '../../../../actionsTypes/technologiesActionTypes';
import { useAppDispatch } from '../../../../redusers/useTypedSelector';
import AddModal from '../Modal/TechModal';
import DeleteModal from '../../../Items/DeleteModal';

interface IChip{
    techCollection: ITechnology[],  
}

const ChipItem: React.FC<IChip> = ({ techCollection}) => {
    const [editableTech, setEditableTech] = React.useState<ITechnology>();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();
    
    const handleClick = (tech: ITechnology) => {
        setEditableTech(tech);
        handleOpen();
    };

    const [openDelModal, setOpenDelModal] = React.useState(false);
    const handleOpenDelModal = (id: string) => {
        setdelId(id);
        setOpenDelModal(true);
    }
    const handleCloseDelModal = () => setOpenDelModal(false);
    const [delId, setdelId] = React.useState("");
  
    return (
        <>
            <AddModal open={open} handleClose={handleClose} editableTech={editableTech}/>
            <DeleteModal open={openDelModal} handleClose={handleCloseDelModal} id={delId} type={"technology"}/>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {techCollection.map((tech) => (
                    <Chip label={tech.name}
                        onDelete={() => handleOpenDelModal(tech.id)}
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