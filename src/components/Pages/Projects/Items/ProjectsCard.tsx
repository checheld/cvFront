import React, { useEffect, useState } from 'react';
import { projectsActions } from '../../../../actionsTypes/projectsActionTypes';
import { useAppDispatch } from '../../../../redusers/useTypedSelector';
import { useTypedSelector } from '../../../../redusers/useTypedSelector';
import { Box, Button, Chip, createTheme, Divider, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography } from '@mui/material';
import { technologiesActions } from '../../../../actionsTypes/technologiesActionTypes';
import ProjectModal from '../Modal/ProjectModal';
import { IProject } from '../../../../interfaces';
import DeleteModal from '../../../Items/DeleteModal';
import TableItem from './TableItem';
import Delete from '../../../../img/Delete';
import { useNavigate } from 'react-router-dom';

interface IProjectsTable {
    project: IProject
    setOpenDelModal: any,
    setdelId: any,
    setEditableProject: any,
    handleOpen: any
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    padding: '20px',
    height: '340px',
    width: '315px',
    mr: '6px'
}));

const lightTheme = createTheme({
    palette: { mode: 'light' },
    components: {
        MuiButtonBase: {
            styleOverrides: {
                root: { backgroundColor: '#F1F3F5', height: '30px' },
            }
        },
    }
});

const ProjectsCard: React.FC<IProjectsTable> = ({ project, setOpenDelModal, setdelId, setEditableProject, handleOpen }) => {

    const router = useNavigate();

    const handleOpenDelModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        setdelId(event.currentTarget.id);
        setOpenDelModal(true);
    }

    return (
        <Box sx={{ p: '0px', m: '0px', position: 'relative' }}>
            <ThemeProvider theme={lightTheme}>
                <Item elevation={4} key={project.id}>
                    <Box sx={{ m: 0 }} onClick={() => router(`/projects/${project.id}`)}>
                        <Box sx={{ display: 'flex', mb: '20px' }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19.1px', color: '#989CA8', fontFamily: `"Nunito", sans-serif` }}>ID</Typography>
                            <Typography sx={{ ml: 'auto', mr: '10px', fontWeight: 400, fontSize: '14px', lineHeight: '19.1px', fontFamily: `"Nunito", sans-serif` }}>{project.id}</Typography>
                        </Box>
                        <Divider variant="inset" sx={{ border: '0,5px solid #E3E3EA', mb: '20px', width: 310, ml: 0 }} />
                        <Box sx={{ display: 'flex', mb: '20px' }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19.1px', color: '#989CA8', fontFamily: `"Nunito", sans-serif` }}>PROJECT NAME</Typography>
                            <Typography sx={{ ml: 'auto', mr: '10px', fontWeight: 400, fontSize: '14px', lineHeight: '19.1px', fontFamily: `"Nunito", sans-serif` }}>{project.name}</Typography>
                        </Box>
                        <Divider variant="inset" sx={{ border: '0,5px solid #E3E3EA', mb: '20px', width: 310, ml: 0 }} />
                        <Box sx={{ display: 'flex', mb: '20px' }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19.1px', color: '#989CA8', fontFamily: `"Nunito", sans-serif` }}>TYPE</Typography>
                            <Typography sx={{ ml: 'auto', mr: '10px', fontWeight: 400, fontSize: '14px', lineHeight: '19.1px', fontFamily: `"Nunito", sans-serif` }}>{project.projectType!.name}</Typography>
                        </Box>
                        <Divider variant="inset" sx={{ border: '0,5px solid #E3E3EA', mb: '20px', width: 310, ml: 0 }} />
                        <Box sx={{ display: 'flex', mb: '20px' }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19.1px', color: '#989CA8', fontFamily: `"Nunito", sans-serif` }}>TECHNOLOGIES</Typography>
                            <Box sx={{ ml: 'auto', p: 0, overflow: 'hidden', display: 'flex', flexWrap: 'nowrap' }}>
                                <Chip label={project.technologyList[0].name} sx={{ mr: '10px', bgcolor: '#F0F2F5', color: '#9EA9BA', fontSize: '12px', fontFamily: `"Nunito", sans-serif` }} id={project.technologyList[0].id} />
                                <Chip sx={{ mr: '10px', bgcolor: '#F0F2F5', color: '#9EA9BA', fontSize: '12px', fontWeight: 400, fontFamily: `"Nunito", sans-serif` }} label={`+${project.technologyList.length - 1}`} />
                            </Box>
                        </Box>
                        <Divider variant="inset" sx={{ border: '0,5px solid #E3E3EA', mb: '20px', width: 310, ml: 0 }} />
                        <Box sx={{ display: 'flex', mb: '20px' }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19.1px', color: '#989CA8', fontFamily: `"Nunito", sans-serif` }}>COUNTRY</Typography>
                            <Typography sx={{ ml: 'auto', mr: '10px', fontWeight: 400, fontSize: '14px', lineHeight: '19.1px', fontFamily: `"Nunito", sans-serif` }}>{project.country}</Typography>
                        </Box>
                        <Divider variant="inset" sx={{ border: '0,5px solid #E3E3EA', mb: '20px', width: 310, ml: 0 }} />
                    </Box>
                    <Stack spacing='15px' direction="row" key={project.id}>
                        <Button variant='text' sx={{ ml: 'auto' }} onClick={handleOpenDelModal} id={project.id} >
                            <Delete />
                        </Button>
                    </Stack>
                </Item>
            </ThemeProvider>
        </Box>
    );
}
export default ProjectsCard