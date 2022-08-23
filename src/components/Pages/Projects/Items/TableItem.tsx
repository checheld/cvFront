import React, { useEffect, useRef, useState } from 'react';
import Delete from '../../../../img/Delete';
import { Box, Button, Chip, Stack, TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IProject, ITechnology } from '../../../../interfaces';

interface ITableItem {
    project: IProject
    setOpenDelModal: any,
    setdelId: any,
    setEditableProject: any,
    handleOpen: any
}

const TableItem: React.FC<ITableItem> = ({ project, setOpenDelModal, setdelId, setEditableProject, handleOpen }) => {

    const router = useNavigate();

    const handleOpenDelModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        setdelId(event.currentTarget.id);
        setOpenDelModal(true);
    }

    useEffect(() => {
        setAmountHideTech(project.technologyList.length - showTech.length)
    }, [project]);

    let techTableCellRef = useRef();

    const [showTech, setShowTech] = useState<ITechnology[]>([project.technologyList[0], project.technologyList[1], project.technologyList[2]]);
    const [amountHideTech, setAmountHideTech] = useState(0);

    const screenWidth = window.screen.width;
    const [inputWidth, setInputWidth] = useState<number>();
    useEffect(() => {
        if (screenWidth <= 1024) setShowTech([project.technologyList[0]])
        else setShowTech([project.technologyList[0], project.technologyList[1], project.technologyList[2]])
    }, [screenWidth]);

    return (
        <TableRow
            key={project.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell variant='footer' align="left">{project.id}</TableCell>
            <TableCell component="th"
                scope="row"
                onClick={() => router(`/projects/${project.id}`)}
                sx={{ color: '#5893F9', width: '30%' }}
            >
                {project.name}
            </TableCell>

            <TableCell component="th" scope="row" sx={{ width: '10%' }}>
                {project.projectType!.name}
            </TableCell>
            <TableCell component="th" scope="row" sx={{ display: 'flex' }} ref={techTableCellRef}>
                {project.technologyList.length > 3 ? (
                    <Box sx={{ m: 0, p: 0, overflow: 'hidden', display: 'flex', flexWrap: 'nowrap' }}>
                        {
                            showTech.map((tech: ITechnology, index) => (
                                <Chip label={tech.name} sx={{ mr: '10px', bgcolor: '#F0F2F5', color: '#9EA9BA', fontSize: '14px', fontWeight: 600, pr: '15px', pl: '15px' }} id={`chipId${index}`} />
                            ))
                        }
                        <Chip sx={{ mr: '10px', bgcolor: '#F0F2F5', color: '#9EA9BA', fontSize: '14px', fontWeight: 600 }} label={`+${amountHideTech}`} />
                    </Box>
                ) : (
                    <Box sx={{ m: 0, p: 0, overflow: 'hidden', display: 'flex', flexWrap: 'nowrap' }}>
                        {
                            project.technologyList.map((tech: ITechnology, index) => (
                                <Chip label={tech.name} sx={{ mr: '10px', bgcolor: '#F0F2F5', color: '#9EA9BA', fontSize: '14px', fontWeight: 600, pr: '15px', pl: '15px' }} id={`chipId${index}`} />
                            ))
                        }
                    </Box>
                )}
            </TableCell>
            <TableCell component="th" scope="row" sx={{ width: '15%' }}>
                {project.country}
            </TableCell>
            <TableCell align="right" key={project.id} sx={{ mr: 'auto', width: 0 }}>
                <Stack spacing='15px' direction="row" sx={{ mr: '30px' }} key={project.id}>
                    <Button variant='text' onClick={handleOpenDelModal} id={project.id} >
                        <Delete />
                    </Button>
                </Stack>
            </TableCell>
        </TableRow>
    );
}
export default TableItem
