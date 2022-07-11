import React, { useEffect, useState } from 'react';
import EditButton from '../../../Items/EditButton';
import Delete from '../../../../img/Delete';
import {companiesActions} from '../../../../actionsTypes/companiesActionTypes';
import { useAppDispatch  } from '../../../../redusers/useTypedSelector';
import { ICompany } from '../../../../interfaces';
import { useTypedSelector } from '../../../../redusers/useTypedSelector';
import EditModal from '../../../Items/EditModal';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteModal from '../../../Items/DeleteModal';

interface IBasicTable {
  searchParam: string;
}

const WorkExpTable: React.FC<IBasicTable> = ({ searchParam }) => {
  const dispatch = useAppDispatch();
  let companies = useTypedSelector((state) => state.companies.companies);
  const result = useTypedSelector((state) => state.companies.result);

  useEffect(() => {
    dispatch({ type: companiesActions.GET_COMPANIES_REQUEST });
  }, [result, dispatch]);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [company, setCompany] = useState({id: '', name: ''})

  const modalOpen = (company: ICompany) => {
    setOpen(true);
    setCompany(company);
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
      <EditModal open={open} handleClose={handleClose} item={company} action={companiesActions.EDIT_COMPANY_REQUEST} />
      <DeleteModal open={openDelModal} handleClose={handleCloseDelModal} id={delId} type={"company"}/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, border: '1px solid #E3E3EA', borderRadius: '10px' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell variant='head' sx={{ width: '20px' }}>ID</TableCell>
              <TableCell variant='head' align="left">COMPANY</TableCell>
              <TableCell variant='head' align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
                <TableRow
                  key={company.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell variant='footer' align="left">{company.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {company.name}
                  </TableCell>
                  <TableCell align="right" key ={company.id}>
                    <Stack spacing='15px' direction="row" sx={{ mr: '30px' }} key ={company.id}>
                    <Button variant='text' key={company.id} onClick={() => modalOpen(company)}>
                      <EditButton />
                    </Button>
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