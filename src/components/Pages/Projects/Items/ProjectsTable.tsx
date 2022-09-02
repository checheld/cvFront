import React, { useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ProjectModal from '../Modal/ProjectModal';
import { IProject } from '../../../../interfaces';
import DeleteModal from '../../../Items/DeleteModal';
import TableItem from './TableItem';
import ProjectsCard from './ProjectsCard';

const ProjectsTable: React.FC<{ projects: IProject[] }> = (props) => {

  const [open, setOpen] = useState(false);
  const [editableProject, setEditableProject] = useState<IProject>();
  const [openDelModal, setOpenDelModal] = useState(false);
  const [delId, setdelId] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDelModal = () => setOpenDelModal(false);

  const screenWidth = window.screen.width;

  return (
    <>
      {(screenWidth > 425) ? (
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
                {props.projects.map((project: IProject) => (
                  <TableItem project={project} setOpenDelModal={setOpenDelModal} setdelId={setdelId} setEditableProject={setEditableProject} handleOpen={handleOpen} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box sx={{
          p: 2,
          bgcolor: '#FBFBFB',
          display: 'flex',
          flexWrap: 'wrap',
          gridTemplateColumns: { md: '1fr 1fr' },
          gap: 2,
          padding: '0px'
        }}>
          {props.projects.map((project: IProject) => (
            <ProjectsCard project={project} setOpenDelModal={setOpenDelModal} setdelId={setdelId} setEditableProject={setEditableProject} handleOpen={handleOpen} />
          ))}
        </Box>
      )}
    </>
  );
}
export default ProjectsTable