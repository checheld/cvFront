import React, { useEffect, useState } from 'react';
import EditButton from '../../../Items/EditButton';
import Delete from '../../../../img/Delete';
import { projectsActions } from '../../../../actionsTypes/projectsActionTypes';
import { useAppDispatch } from '../../../../redusers/useTypedSelector';
import { useTypedSelector } from '../../../../redusers/useTypedSelector';
import { Box, Button, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { technologiesActions } from '../../../../actionsTypes/technologiesActionTypes';
import ProjectModal from '../Modal/ProjectModal';
import { useNavigate } from 'react-router-dom';
import { IProject, ITechnology } from '../../../../interfaces';
import DeleteModal from '../../../Items/DeleteModal';

interface IProjectsTable {
  projects: IProject[]
}

const ProjectsTable: React.FC<IProjectsTable> = ({ projects }) => {
  const dispatch = useAppDispatch();
  const router = useNavigate();

  const result = useTypedSelector((state) => state.projects.result);

  useEffect(() => {
    dispatch({ type: projectsActions.GET_PROJECTS_REQUEST });
    dispatch({ type: technologiesActions.GET_TECHNOLOGIES_REQUEST });
  }, [result, dispatch]);

  const [editableProject, setEditableProject] = React.useState<IProject>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (project: IProject) => {
    setEditableProject(project);
    handleOpen();
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
      <ProjectModal open={open} handleClose={handleClose} editableProject={editableProject} />
      <DeleteModal open={openDelModal} handleClose={handleCloseDelModal} id={delId} type={"project"} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, border: '1px solid #E3E3EA', borderRadius: '10px' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell variant='head'>ID</TableCell>
              <TableCell variant='head' align="left">PROJECT NAME</TableCell>
              <TableCell variant='head' align="left">TYPE</TableCell>
              <TableCell variant='head' align="left">TECHNOLOGIES</TableCell>
              <TableCell variant='head' align="left">COUNTRY</TableCell>
              <TableCell variant='head' align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project: IProject) => (
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
                <TableCell component="th" scope="row" sx={{ width: '20%' }}>
                  {project.type}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ width: '35%' }}>
                  {
                    project.technologyList.map((tech: ITechnology) => (
                      <Chip label={tech.name} sx={{ mr: '10px' }} />
                    ))
                  }
                </TableCell>
                <TableCell component="th" scope="row" sx={{ width: '35%' }}>
                  {project.country}
                </TableCell>
                <TableCell align="right" key={project.id}>
                  <Stack spacing='15px' direction="row" sx={{ mr: '30px' }} key={project.id}>
                    <Button variant='text' onClick={() => handleClick(project)} key={project.id} >
                      <EditButton />
                    </Button>
                    <Button variant='text' onClick={handleOpenDelModal} id={project.id} >
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
export default ProjectsTable

function useHistory() {
  throw new Error('Function not implemented.');
}
