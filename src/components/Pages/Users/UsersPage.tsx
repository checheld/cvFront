import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, createTheme, Paper, styled, ThemeProvider } from '@mui/material';
import CustomButton from '../../Items/CustomButton';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { usersActions } from '../../../actionsTypes/usersActionTypes';
import Input from '../../Items/Input';
import { useNavigate } from 'react-router-dom';
import UserModal from './Modal/UserModal';
import { universitiesActions } from '../../../actionsTypes/universitiesActionTypes';
import { technologiesActions } from '../../../actionsTypes/technologiesActionTypes';
import { companiesActions } from '../../../actionsTypes/companiesActionTypes';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    padding: '30px',
}));
const lightTheme = createTheme({ palette: { mode: 'light' } });

const UsersPage: React.FC = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ searchParam, setSearchParam ] = React.useState<string>('');
    const dispatch = useAppDispatch();
    const router = useNavigate();
    const users = useTypedSelector((state) => state.users.users);
    const result = useTypedSelector((state) => state.users.result);

    useEffect(() => {
        dispatch({ type: usersActions.GET_USERS_REQUEST });
        dispatch({ type: universitiesActions.GET_UNIVERSITIES_REQUEST });
        dispatch({ type: technologiesActions.GET_TECHNOLOGIES_REQUEST });
        dispatch({ type: companiesActions.GET_COMPANIES_REQUEST });
    }, [result, dispatch]);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                if (searchParam === '') {
                    dispatch({ type: usersActions.GET_USERS_REQUEST });
                } else {
                    dispatch({ type: usersActions.SEARCH_USERS_REQUEST, payload: searchParam });
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [searchParam]);

    return (
    <Box sx={{ pl: '250px', pr: '35px'}}>
        <UserModal open={open} handleClose={handleClose} />
        <Typography sx={{fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb:'30px'}}>Users ({users.length})</Typography>
            <Box sx={{ display: 'flex' }}>
                <Input setParam={setSearchParam} placeholder={"Search user"} />
                <Box sx={{ marginLeft: 'auto' }}>
                    <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add User' />
                </Box>
            </Box>
            <Box sx={{
                p: 2,
                bgcolor: '#FBFBFB',
                display: 'flex', 
                flexWrap: 'wrap',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
                padding: '0px'
            }}>
                <ThemeProvider theme={lightTheme}>
                    {users.map((user) => (
                        <Item elevation={4}
                            sx={{ width: '335px', mr: '6px' }}
                            onClick={() => router(`/users/${user.id}`)}>
                            <Typography sx={{ fontWeight: 600, fontSize: '18px', lineHeight: '24.5px', color: '#535E6C', mb: '25px' }}>{user.firstName} {user.lastName}</Typography>
                            <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: '#AFB5BF', mb: '25px' }}>{user.description}</Typography>
                            <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#ECF2FC', color: '#5893F9', textTransform: 'capitalize' }}>More</Button>
                        </Item>
                    ))}
                </ThemeProvider>
            </Box>
        </Box>
    )
}
export default UsersPage