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
import { useAppDispatch  } from '../redusers/useTypedSelector';
import { IUniversity } from '../interfaces';
import { Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import CustomButton from '../components/CustomButton';
import ModalInput from '../components/ModalInput';
import { useTypedSelector } from '../redusers/useTypedSelector';

interface IBasicTable {
  searchParam: any;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FFFFFF',
  borderRadius: '30px',
  boxShadow: 24,
  p: 4,
};

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
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, border: '1px solid #E3E3EA', borderRadius: '10px' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell variant= 'head' sx={{width: '20px'}}>ID</TableCell>
              <TableCell variant='head' align="left">UNIVERSITY</TableCell>
              <TableCell variant='head' align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {universities.map((university: any) => (
                <TableRow
                  key={university.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell variant='footer' align="left">{university.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {university.name}
                  </TableCell>
                  <TableCell align="right">
                    <Stack spacing='15px' direction="row" sx={{ mr: '30px' }}>
                      <Button variant='text' id={university.id} onClick={handleOpen}>
                        <EditButton />
                      </Button>
                    <Button variant='text' id={university.id} onClick={delUniversity}>
                      <Delete />
                    </Button>
                  </Stack>
                </TableCell>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Box sx={{ m: '50px' }}>
                      <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
                        Edit University
                      </Typography>
                      <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                        University
                      </Typography>
                      <ModalInput placeholder="University" item={university.name} />
                      <Box>
                        <CustomButton variant="contained" children='Save University' disabled={false} />
                      </Box>
                    </Box>
                  </Box>
                </Modal>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default BasicTable