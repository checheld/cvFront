import React, { useState } from 'react';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { companiesActions } from '../../../../actionsTypes/companiesActionTypes';
import EditModal from '../../../Items/EditModal';
import DeleteModal from '../../../Items/DeleteModal';
import { ICompany } from '../../../../interfaces';
import Delete from '../../../../img/Delete';
import '../../../Components.css';

const WorkExpTable: React.FC<{ companies: ICompany[] }> = (props) => {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [company, setCompany] = useState({ id: 0, name: '' })

  const modalOpen = (company: ICompany) => {
    setOpen(true);
    setCompany(company);
  };

  const [openDelModal, setOpenDelModal] = useState(false);
  const handleOpenDelModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setdelId(Number(event.currentTarget.id));
    setOpenDelModal(true);
  }
  const handleCloseDelModal = () => setOpenDelModal(false);
  const [delId, setdelId] = useState(0);

  return (
    <Box>
      <EditModal open={open} handleClose={handleClose} item={company} action={companiesActions.EDIT_COMPANY_REQUEST} editName={'Company'} />
      <DeleteModal open={openDelModal} handleClose={handleCloseDelModal} id={delId} type={"company"} />
      <TableContainer component={Paper}>
        <Table className='table'>
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
                  className='clicableTableItem'
                  onClick={() => modalOpen(company)}>
                  {company.name}
                </TableCell>
                <TableCell align="right" key={company.id}>
                  <Stack spacing='15px' direction="row" sx={{ mr: '30px' }} key={company.id}>
                    <Button variant='text' onClick={handleOpenDelModal} id={String(company.id)}>
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