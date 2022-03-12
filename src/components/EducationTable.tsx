import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditButton from './EditButton';
import Delete from '../img/Delete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import {universitiesActions} from '../actionsTypes/universitiesActionTypes';
import { useAppDispatch  } from '../redusers/useTypedSelector';
import { IUniversity } from '../interfaces';
import { Box } from '@mui/material';
import { useTypedSelector } from '../redusers/useTypedSelector';
import EditModal from './EditModal';

interface IBasicTable {
  searchParam: any;
}

const BasicTable: React.FC<IBasicTable> = ({ searchParam }) => {
  const dispatch = useAppDispatch();
  let universities = useTypedSelector((state) => state.universities.universities);
  const result = useTypedSelector((state) => state.universities.result);
  const loading = useTypedSelector((state) => state.universities.isLoading.get)
  useEffect(() => {
    dispatch({ type: universitiesActions.GET_UNIVERSITIES_REQUEST });
  }, [result, dispatch]);

  universities = universities.filter((item: IUniversity) => item.name.includes(searchParam))

  const delUniversity = (event: React.MouseEvent<HTMLButtonElement>) => {
      dispatch( {type: universitiesActions.DEL_UNIVERSITY_REQUEST, payload: event.currentTarget.id});
  }

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [university, setUniversity] = useState({name: '', id: ''})

  const modalOpen = (university: any) => {
    setOpen(true);
    setUniversity(university);
  };

  return (
    <Box>

      <EditModal open={open} handleClose={handleClose} university={university} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, border: '1px solid #E3E3EA', borderRadius: '10px' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell variant='head' sx={{ width: '20px' }}>ID</TableCell>
              <TableCell variant='head' align="left">UNIVERSITY</TableCell>
              <TableCell variant='head' align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {universities.map((university: any) => (
                <TableRow
                  id={university.id}
                  key={university.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell variant='footer' align="left">{university.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {university.name}
                  </TableCell>
                  <TableCell align="right" id={university.id} key ={university.id}>
                    <Stack spacing='15px' direction="row" sx={{ mr: '30px' }} id={university.id} key ={university.id}>
                      <Button variant='text' id={university.id} key ={university.id} onClick={()=>modalOpen(university)}>
                        <EditButton />
                      </Button>
                    <Button variant='text' id={university.id} onClick={delUniversity}>
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