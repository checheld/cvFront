import React, { useEffect } from 'react';
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
import { RootStateOrAny } from 'react-redux';
import {universitiesActions} from '../actionsTypes/universitiesActionTypes';
import { useAppDispatch, useAppSelector,  } from '../redusers/hooks';
import { IUniversity } from '../interfaces';

interface IBasicTable {
  searchParam: any;
}


const BasicTable: React.FC<IBasicTable> = ({ searchParam }) => {
  const dispatch = useAppDispatch();
  let universities = useAppSelector((state:RootStateOrAny) => state.universities.universities);
  const adding = useAppSelector((state:RootStateOrAny) => state.universities.addResult);
  const editing = useAppSelector((state:RootStateOrAny) => state.universities.editResult);
  const deliting = useAppSelector((state:RootStateOrAny) => state.universities.isDelete);
  useEffect(() => {
    dispatch({ type: universitiesActions.GET_UNIVERSITIES_REQUEST });
  }, [adding, editing, deliting, dispatch]);

  universities = universities.filter((item: IUniversity) => item.name.includes(searchParam))

  const delUniversity = (event: React.MouseEvent<HTMLButtonElement>) => {
      dispatch( {type: universitiesActions.DEL_UNIVERSITY_REQUEST, payload: event.currentTarget.id});
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, border: '1px solid #E3E3EA',borderRadius: '10px' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell variant = 'head' sx={{width: '20px'}}>ID</TableCell>
            <TableCell variant = 'head' align="left">UNIVERSITY</TableCell>
            <TableCell variant = 'head' align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {universities.map((university: any) => ( 
            <TableRow
              key={university.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell variant = 'footer' align="left">{university.id}</TableCell>
                <TableCell component="th" scope="row">
                    {university.name}
              </TableCell>
              <TableCell align="right">
                <Stack spacing='15px' direction="row" sx={{ mr: '30px' }}>
                  <EditButton />
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
  );
}
export default BasicTable