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

    const [showTech] = useState<ITechnology[]>([project.technologies[0], project.technologies[1], project.technologies[2]]);

    const handleOpenDelModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        setdelId(event.currentTarget.id);
        setOpenDelModal(true);
    }

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

            <TableCell component="th" scope="row">
                {project.projectType!.name}
            </TableCell>  

            {screenWidth > 1025 ? (
                <TableCell component="th" scope="row" sx={{ display: 'flex' }}>
                    {project.technologies.length > 3 ? (
                        <Box className='chipContainer projectTableChipContainer'>
                            {
                                showTech.map((tech: ITechnology, index) => (
                                    <Chip label={tech.name} className='projectChip projectTableChip' id={`chipId${index}`} key={index} />
                                ))
                            }
                            <Chip className='projectChip projectTableChip' label={`+${project.technologies.length - 3}`} />
                        </Box>
                    ) : (
                        <Box className='chipContainer projectTableChipContainer'>
                            {
                                project.technologies.length !== 0 && project.technologies.map((tech: ITechnology, index) => (
                                    <Chip label={tech.name} className='projectChip projectTableChip' id={`chipId${index}`} key={index} />
                                ))
                            }
                        </Box>
                    )}
                </TableCell>
            ) : (
                    <TableCell component="th" scope="row" sx={{ display: 'flex' }}>
                        <Box className='chipContainer chipContainerWrap projectTableChipContainer'>
                            {project.technologies.length !== 0 && (
                                <>
                                    <Chip label={showTech[0].name} className='projectChip projectTableChip' sx={{mb: '5px'}} />
                                    {project.technologies.length > 1 && <Chip className='projectChip projectTableChip' label={`+${project.technologies.length - 1}`} />}
                                </>
                            )}
                        </Box>
                    </TableCell>
            )}
            <TableCell component="th" scope="row" sx={{ width: '15%' }}>
                {project.country}
            </TableCell>
            <TableCell align="right" key={project.id} sx={{ mr: 'auto', width: 0 }}>
                <Stack spacing='15px' direction="row" sx={{ mr: '30px' }} key={project.id}>
                    <Button variant='text' onClick={handleOpenDelModal} id={String(project.id)} >
                        <Delete />
                    </Button>
                </Stack>
            </TableCell>
        </TableRow>
    );
}
export default TableItem
