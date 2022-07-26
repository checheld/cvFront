import React, { useEffect, useState } from 'react';
import { projectsActions } from '../../../../actionsTypes/projectsActionTypes';
import { useAppDispatch } from '../../../../redusers/useTypedSelector';
import { useTypedSelector } from '../../../../redusers/useTypedSelector';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { technologiesActions } from '../../../../actionsTypes/technologiesActionTypes';
import ProjectModal from '../Modal/ProjectModal';
import { IProject } from '../../../../interfaces';
import DeleteModal from '../../../Items/DeleteModal';
import TableItem from './TableItem';

interface IProjectsTable {
  projects: IProject[]
}

const ProjectsTable: React.FC<IProjectsTable> = ({ projects }) => {

  const dispatch = useAppDispatch();
  const result = useTypedSelector((state) => state.projects.result);

  useEffect(() => {
    dispatch({ type: projectsActions.GET_PROJECTS_REQUEST });
    dispatch({ type: technologiesActions.GET_TECHNOLOGIES_REQUEST });
  }, [result, dispatch]);

  const [editableProject, setEditableProject] = React.useState<IProject>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelModal, setOpenDelModal] = React.useState(false);
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
              <TableItem project={project} setOpenDelModal={setOpenDelModal} setdelId={setdelId} setEditableProject={setEditableProject} handleOpen={handleOpen} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default ProjectsTable