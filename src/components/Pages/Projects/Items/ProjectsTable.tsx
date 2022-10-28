import React, { useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { IProject } from '../../../../interfaces';
import DeleteModal from '../../../Items/DeleteModal';
import TableItem from './TableItem';
import ProjectsCard from './ProjectsCard';
import '../../../Components.css';

const ProjectsTable: React.FC<{ projects: IProject[] }> = (props) => {

  const [openDelModal, setOpenDelModal] = useState(false);
  const [delId, setdelId] = useState("");

  const handleCloseDelModal = () => setOpenDelModal(false);

  const screenWidth = window.screen.width;

  return (
    <>
      {(screenWidth > 425) ? (
        <Box>
          <DeleteModal open={openDelModal} handleClose={handleCloseDelModal} id={delId} type={"project"} />
          <TableContainer component={Paper}>
            <Table className='table'>
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
                {props.projects.map((project: IProject, i) => (
                  <TableItem project={project} setOpenDelModal={setOpenDelModal} setdelId={setdelId} key={i} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box className='techContainer techContainerMain'>
          {props.projects.map((project: IProject, i) => (
            <ProjectsCard project={project} setOpenDelModal={setOpenDelModal} setdelId={setdelId} key={i} />
          ))}
        </Box>
      )}
    </>
  );
}
export default ProjectsTable