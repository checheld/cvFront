import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Stack, TableCell, TableRow } from '@mui/material';
import Delete from '../../../../img/Delete';
import { IProject, ITechnology } from '../../../../interfaces';
import '../../../Components.css';

interface ITableItem {
    project: IProject
    setOpenDelModal: any,
    setdelId: any,
}

const TableItem: React.FC<ITableItem> = ({ project, setOpenDelModal, setdelId }) => {

    const router = useNavigate();
    const screenWidth = window.screen.width;

    const [showTech, setShowTech] = useState<ITechnology[]>([project.technologyList[0], project.technologyList[1], project.technologyList[2]]);
    const [amountHideTech, setAmountHideTech] = useState<number>();

    const handleOpenDelModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        setdelId(event.currentTarget.id);
        setOpenDelModal(true);
    }

    useEffect(() => {
        if (screenWidth <= 1024) setShowTech([project.technologyList[0]])
        else setShowTech([project.technologyList[0], project.technologyList[1], project.technologyList[2]])
    }, []);

    useEffect(() => {
        setAmountHideTech(project.technologyList.length - showTech.length)
    }, [showTech]);

    let techTableCellRef = useRef();

    return (
        <TableRow
            key={project.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell variant='footer' align="left">{project.id}</TableCell>
            <TableCell component="th"
                scope="row"
                onClick={() => router(`/projects/${project.id}`)}
                className='clicableTableItem projectTableClassName'
            >
                {project.name}
            </TableCell>

            <TableCell component="th" scope="row" sx={{ width: '10%' }}>
                {project.projectType!.name}
            </TableCell>
            {showTech.length === 3 ? (
                <TableCell component="th" scope="row" sx={{ display: 'flex' }} ref={techTableCellRef}>
                    {project.technologyList.length > 3 ? (
                        <Box className='chipContainer projectTableChipContainer'>
                            {
                                showTech.map((tech: ITechnology, index) => (
                                    <Chip label={tech.name} className='projectChip projectTableChip' id={`chipId${index}`} key={index} />
                                ))
                            }
                            <Chip className='projectChip projectTableChip' label={`+${amountHideTech}`} />
                        </Box>
                    ) : (
                        <Box className='chipContainer projectTableChipContainer'>
                            {
                                project.technologyList.map((tech: ITechnology, index) => (
                                    <Chip label={tech.name} className='projectChip projectTableChip' id={`chipId${index}`} key={index} />
                                ))
                            }
                        </Box>
                    )}
                </TableCell>
            ) : (
                <TableCell component="th" scope="row" sx={{ display: 'flex' }} ref={techTableCellRef}>
                    <Box className='chipContainer projectTableChipContainer'>
                        {
                            showTech.map((tech: ITechnology, index) => (
                                <Chip label={tech.name} className='projectChip projectTableChip' id={`chipId${index}`} key={index} />
                            ))
                        }
                        <Chip className='projectChip projectTableChip' label={`+${amountHideTech}`} />
                    </Box>
                </TableCell>
            )}
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
