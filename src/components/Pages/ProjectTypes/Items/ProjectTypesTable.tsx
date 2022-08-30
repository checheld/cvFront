import React, { useEffect, useState } from 'react';
import EditButton from '../../../Items/EditButton';
import Delete from '../../../../img/Delete';
import { projectTypesActions } from '../../../../actionsTypes/projectTypesActionTypes';
import { useAppDispatch } from '../../../../redusers/useTypedSelector';
import { IProjectType } from '../../../../interfaces';
import { useTypedSelector } from '../../../../redusers/useTypedSelector';
import EditModal from '../../../Items/EditModal';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteModal from '../../../Items/DeleteModal';

const BasicTable: React.FC = () => {
    const dispatch = useAppDispatch();
    let projectTypes = useTypedSelector((state) => state.projectTypes.projectTypes);
    const result = useTypedSelector((state) => state.projectTypes.result);

    useEffect(() => {
        dispatch({ type: projectTypesActions.GET_PROJECTTYPES_REQUEST });
    }, [result, dispatch]);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [projectType, setProjectType] = useState({ name: '', id: '' })

    const modalOpen = (projectType: IProjectType) => {
        setOpen(true);
        setProjectType(projectType);
    };

    const [openDelModal, setOpenDelModal] = React.useState(false);
    const handleOpenDelModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        setdelId(event.currentTarget.id);
        setOpenDelModal(true);
    }
    const handleCloseDelModal = () => setOpenDelModal(false);
    const [delId, setdelId] = React.useState("");

    return (
        <Box>
            <EditModal open={open} handleClose={handleClose} item={projectType} action={projectTypesActions.EDIT_PROJECTTYPE_REQUEST} editName={'Project type'} />
            <DeleteModal open={openDelModal} handleClose={handleCloseDelModal} id={delId} type={"project type"} />
            <TableContainer component={Paper}>
                <Table sx={{ border: '1px solid #E3E3EA', borderRadius: '10px' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell variant='head' sx={{ width: '20px' }}>ID</TableCell>
                            <TableCell variant='head' align="left">PROJECT TYPE</TableCell>
                            <TableCell variant='head' align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projectTypes.map((projectType) => (
                            <TableRow
                                key={projectType.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell variant='footer' align="left">{projectType.id}</TableCell>
                                <TableCell component="th"
                                    scope="row"
                                    sx={{ color: '#5893F9' }}
                                    onClick={() => modalOpen(projectType)}>
                                    {projectType.name}
                                </TableCell>
                                <TableCell align="right" key={projectType.id}>
                                    <Stack spacing='15px' direction="row" sx={{ mr: '30px' }} key={projectType.id}>
                                        <Button variant='text' onClick={handleOpenDelModal} id={projectType.id} >
                                            <Delete />
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
export default BasicTable