import React from 'react';
import { Chip, Stack } from '@mui/material';
import { ITechnology } from '../../../../interfaces';
import DeleteModal from '../../../Items/DeleteModal';

interface IChip {
    techCollection: ITechnology[],
    handleEdit?: any
}

const ChipItem: React.FC<IChip> = ({ techCollection, handleEdit }) => {

    const [openDelModal, setOpenDelModal] = React.useState(false);
    const handleOpenDelModal = (id: number) => {
        setdelId(id);
        setOpenDelModal(true);
    }
    const handleCloseDelModal = () => setOpenDelModal(false);
    const [delId, setdelId] = React.useState(0);

    return (
        <>
            <DeleteModal open={openDelModal} handleClose={handleCloseDelModal} id={delId} type={"technology"} />
            <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {techCollection.map((tech, i) => (
                    <Chip label={tech.name}
                        onDelete={() => handleOpenDelModal(tech.id)}
                        onClick={() => handleEdit(tech)}
                        id={String(tech.id)}
                        style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            paddingRight: '2px',
                            paddingLeft: '2px',
                            fontFamily: `"Nunito", sans-serif`,
                            backgroundColor: '#F0F2F5',
                            color: '#9EA9BA',
                            borderRadius: '30px',
                            marginRight: '10px',
                            marginBottom: '10px',
                            padding: '0px'
                        }}
                        key={i} />
                ))}
            </Stack>
        </>
    )
}
export default ChipItem