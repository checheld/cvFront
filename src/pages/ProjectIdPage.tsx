import { Box, Button, Chip, CircularProgress, createTheme, Divider, Paper, Stack, styled, ThemeProvider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { projectsActions } from '../actionsTypes/projectsActionTypes';
import { technologiesActions } from '../actionsTypes/technologiesActionTypes';
import ProjectModal from '../components/ProjectModal';
import { IProject, ITechnology } from '../interfaces';
import { useTypedSelector } from '../redusers/useTypedSelector';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  borderRadius: '10px',
  padding: '25px'
}));
const lightTheme = createTheme({ palette: { mode: 'light' } });

const ProjectIdPage: React.FC = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const router = useNavigate();
  const currentPath = location.pathname;
  const projectId = Number(
    currentPath.substring(currentPath.lastIndexOf('/') + 1)
  );
  const edit = useTypedSelector((state) => state.projects.isLoading.edit)
  useEffect(() => {
    const getProject = (async () => {
      await dispatch({ type: projectsActions.GET_PROJECT_REQUEST, id: projectId });
      await dispatch({ type: technologiesActions.GET_TECHNOLOGIES_REQUEST });
    })
    getProject()
  }, [dispatch, projectId, edit]);
  const currentProject: any = useTypedSelector((state) => state.projects.project);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const delProject = () => {
    dispatch({ type: projectsActions.DEL_PROJECT_REQUEST, payload: projectId });
    router(`/projects`)
  }

  return (
    <Box sx={{ pl: '250px', pr: '35px', pt: '35px' }}>
      {currentProject === undefined ? (
        <>
          <CircularProgress></CircularProgress>
        </>
      ) : (
        <>
          <ProjectModal open={open} handleClose={handleClose} editableProject={currentProject}/>
          <ThemeProvider theme={lightTheme}>
            <Stack spacing={2}>
              <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                <Box sx={{ display: "flex", width: '280px' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto' }}>
                    PROJECT NAME
                  </Typography>
                  <Divider orientation="vertical" sx={{ height: '100%' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '23px', color: '#535E6C', mt: '35px', ml: '40px', mb: '15px' }}>
                    {currentProject.name}
                  </Typography>
                  <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: '#AFB5BF', mb: '37px', ml: '40px' }}>
                    {currentProject.description}
                  </Typography>
                </Box>
              </Item>
              <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                <Box sx={{ display: "flex", width: '280px' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto' }}>
                    COUNTRY
                  </Typography>
                  <Divider orientation="vertical" sx={{ height: '100%' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '23px', color: '#535E6C', mt: '35px', ml: '40px', mb: '35px' }}>
                    {currentProject.country}
                  </Typography>
                </Box>
              </Item>
              <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                <Box sx={{ display: "flex", width: '280px' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto' }}>
                    TYPE
                  </Typography>
                  <Divider orientation="vertical" sx={{ height: '100%' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '23px', color: '#535E6C', mt: '35px', ml: '40px', mb: '35px' }}>
                    {currentProject.type}
                  </Typography>
                </Box>
              </Item>
              <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                <Box sx={{ display: "flex", width: '280px' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto' }}>
                    LINK
                  </Typography>
                  <Divider orientation="vertical" sx={{ height: '100%' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '23px', color: '#535E6C', mt: '35px', ml: '40px', mb: '35px' }}>
                    {currentProject.link}
                  </Typography>
                </Box>
              </Item>
              <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                <Box sx={{ display: "flex", width: '280px' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto' }}>
                    TECHNOLOGIES
                  </Typography>
                  <Divider orientation="vertical" sx={{ height: '100%' }} />
                </Box>
                <Box sx={{ mt: '35px', ml: '40px', mb: '35px' }}>
                  {
                    currentProject.technologyList.map((tech: ITechnology) => (
                      <Chip label={tech.name} sx={{ mr: '10px' }} />
                    ))
                  }
                </Box>
              </Item>
            </Stack>
          </ThemeProvider>
          <Box sx={{ ml: '307px', mt: '35px' }}>
            <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#ECF2FC', color: '#5893F9', mr: '10px' }} >Edit</Button>
            <Button variant="contained" onClick={delProject} sx={{ backgroundColor: '#F1F3F5', color: '#BAC1CC' }} >Delete</Button>
          </Box>
        </>
      )}
    </Box>
  )
}
export default ProjectIdPage