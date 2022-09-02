import React, { useState } from 'react';
import Delete from '../../../../img/Delete';
import { companiesActions } from '../../../../actionsTypes/companiesActionTypes';
import { ICompany } from '../../../../interfaces';
import EditModal from '../../../Items/EditModal';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteModal from '../../../Items/DeleteModal';

const WorkExpTable: React.FC<{ companies: ICompany[] }> = (props) => {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [company, setCompany] = useState({ id: '', name: '' })

  const modalOpen = (company: ICompany) => {
    setOpen(true);
    setCompany(company);
  };

  const [openDelModal, setOpenDelModal] = useState(false);
  const handleOpenDelModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setdelId(event.currentTarget.id);
    setOpenDelModal(true);
  }
  const handleCloseDelModal = () => setOpenDelModal(false);
  const [delId, setdelId] = useState("");

  return (
    <Box>
      <EditModal open={open} handleClose={handleClose} item={company} action={companiesActions.EDIT_COMPANY_REQUEST} editName={'Company'} />
      <DeleteModal open={openDelModal} handleClose={handleCloseDelModal} id={delId} type={"company"} />
      <TableContainer component={Paper}>
        <Table sx={{ border: '1px solid #E3E3EA', borderRadius: '10px' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell variant='head' sx={{ width: '20px' }}>ID</TableCell>
              <TableCell variant='head' align="left">COMPANY</TableCell>
              <TableCell variant='head' align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.companies.map((company) => (
              <TableRow
                key={company.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell variant='footer' align="left">{company.id}</TableCell>
                <TableCell component="th"
                  scope="row"
                  sx={{ color: '#5893F9' }}
                  onClick={() => modalOpen(company)}>
                  {company.name}
                </TableCell>
                <TableCell align="right" key={company.id}>
                  <Stack spacing='15px' direction="row" sx={{ mr: '30px' }} key={company.id}>
                    <Button variant='text' onClick={handleOpenDelModal} id={company.id}>
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
export default WorkExpTable