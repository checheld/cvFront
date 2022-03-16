import React, { useEffect, useState } from 'react';
import EditButton from './EditButton';
import Delete from '../img/Delete';
import {universitiesActions} from '../actionsTypes/universitiesActionTypes';
import { useAppDispatch  } from '../redusers/useTypedSelector';
import { IUniversity } from '../interfaces';
import { useTypedSelector } from '../redusers/useTypedSelector';
import EditModal from './EditModal';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface IBasicTable {
  searchParam: string;
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

  const modalOpen = (university : IUniversity) => {
    setOpen(true);
    setUniversity(university);
  };

  return (
    <Box>

      <EditModal open={open} handleClose={handleClose} item={university} action={universitiesActions.EDIT_UNIVERSITY_REQUEST}/>

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
            {universities.map((university) => (
                <TableRow
                  key={university.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell variant='footer' align="left">{university.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {university.name}
                  </TableCell>
                  <TableCell align="right" key ={university.id}>
                    <Stack spacing='15px' direction="row" sx={{ mr: '30px' }} key ={university.id}>
                      <Button variant='text' key ={university.id} onClick={()=>modalOpen(university)}>
                        <EditButton />
                      </Button>
                    <Button variant='text' onClick={delUniversity} id={university.id} >
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