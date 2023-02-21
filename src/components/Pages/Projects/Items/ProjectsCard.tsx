import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Chip, createTheme, Divider, Paper, Stack, styled, ThemeProvider, Typography } from '@mui/material';
import { IProject } from '../../../../interfaces';
import Delete from '../../../../img/Delete';
import '../../../Components.css';

interface IProjectsTable {
    project: IProject
    setOpenDelModal: any,
    setdelId: any,
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    padding: '20px',
    height: '340px',
    width: '315px',
    mr: '6px',
    ['@media (max-width:376px)']: {
        width: '265px'
    }
}));

const CustomDivider = styled(Divider)(() => ({
    border: '0,5px solid #E3E3EA',
    marginBottom: '20px',
    width: 310,
    marginLeft: 0,
    ['@media (max-width:376px)']: {
        width: '265px'
    }
}))

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

const ProjectsCard: React.FC<IProjectsTable> = ({ project, setOpenDelModal, setdelId }) => {

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
                            <Typography className='projectCardTitle'>ID</Typography>
                            <Typography className='projectCardDescription'>{project.id}</Typography>
                        </Box>
                        <CustomDivider variant="inset" />
                        <Box sx={{ display: 'flex', mb: '20px' }}>
                            <Typography className="projectCardTitle">PROJECT NAME</Typography>
                            <Typography className='projectCardDescription'>{project.name}</Typography>
                        </Box>
                        <CustomDivider variant="inset" />
                        <Box sx={{ display: 'flex', mb: '20px' }}>
                            <Typography className="projectCardTitle">TYPE</Typography>
                            <Typography className='projectCardDescription'>{project.projectType!.name}</Typography>
                        </Box>
                        <CustomDivider variant="inset" />
                        <Box sx={{ display: 'flex', mb: '20px' }}>
                            <Typography className="projectCardTitle">TECHNOLOGIES</Typography>
                            <Box className='chipContainer projectCardChipContainer'>
                                <Chip className='projectChip projectCardChip' label={project.technologies[0].name} id={String(project.technologies[0].id)} />
                                {project.technologies.length > 1 && <Chip className='projectChip projectCardChip' label={`+${project.technologies.length - 1}`} />}
                            </Box>
                        </Box>
                        <CustomDivider variant="inset" />
                        <Box sx={{ display: 'flex', mb: '20px' }}>
                            <Typography className="projectCardTitle">COUNTRY</Typography>
                            <Typography className='projectCardDescription'>{project.country}</Typography>
                        </Box>
                        <CustomDivider variant="inset" />
                    </Box>
                    <Stack spacing='15px' direction="row" key={project.id}>
                        <Button variant='text' sx={{ ml: 'auto' }} onClick={handleOpenDelModal} id={String(project.id)} >
                            <Delete />
                        </Button>
                    </Stack>
                </Item>
            </ThemeProvider>
        </Box>
    );
}
export default ProjectsCard