import React, { useState } from 'react';
import Delete from '../../../../img/Delete';
import { universitiesActions } from '../../../../actionsTypes/universitiesActionTypes';
import { IUniversity } from '../../../../interfaces';
import EditModal from '../../../Items/EditModal';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteModal from '../../../Items/DeleteModal';

const BasicTable: React.FC<{ universities: IUniversity[] }> = (props) => {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [university, setUniversity] = useState({ name: '', id: '' })

  const modalOpen = (university: IUniversity) => {
    setOpen(true);
    setUniversity(university);
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
      <EditModal open={open} handleClose={handleClose} item={university} action={universitiesActions.EDIT_UNIVERSITY_REQUEST} editName={'University'} />
      <DeleteModal open={openDelModal} handleClose={handleCloseDelModal} id={delId} type={"university"} />
      <TableContainer component={Paper}>
        <Table sx={{ border: '1px solid #E3E3EA', borderRadius: '10px' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell variant='head' sx={{ width: '20px' }}>ID</TableCell>
              <TableCell variant='head' align="left">UNIVERSITY</TableCell>
              <TableCell variant='head' align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.universities.map((university) => (
              <TableRow
                key={university.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell variant='footer' align="left">{university.id}</TableCell>
                <TableCell component="th"
                  scope="row"
                  sx={{ color: '#5893F9' }}
                  onClick={() => modalOpen(university)}>
                  {university.name}
                </TableCell>
                <TableCell align="right" key={university.id}>
                  <Stack spacing='15px' direction="row" sx={{ mr: '30px' }} key={university.id}>
                    <Button variant='text' onClick={handleOpenDelModal} id={university.id} >
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
export default BasicTable