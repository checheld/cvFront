import React, { useEffect, useState } from 'react';
import { Box, Typography, createTheme, Paper, styled, ThemeProvider } from '@mui/material';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { usersActions } from '../../../actionsTypes/usersActionTypes';
import { universitiesActions } from '../../../actionsTypes/universitiesActionTypes';
import { technologiesActions } from '../../../actionsTypes/technologiesActionTypes';
import { companiesActions } from '../../../actionsTypes/companiesActionTypes';
import NoResult from '../../Items/Search/NoResult';
import PreviewPageUser from '../../Items/PreviewPages/PreviewPageUser';
import UserModal from './Modal/UserModal';
import CustomButton from '../../Items/CustomButton';
import Input from '../../Items/Input';
import UserCard from './Items/userCard';
import { IUser } from '../../../interfaces';
import '../../Components.css';

const CustomBox = styled(Box)(() => ({
    paddingRight: '35px',
    paddingLeft: '250px',
    ['@media (max-width:768px)']: {
        paddingLeft: '35px',
    }
}))

const lightTheme = createTheme({ palette: { mode: 'light' } });

const UsersPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const allUsers = useTypedSelector((state) => state.users.users);
    const load = useTypedSelector((state) => state.users.isLoading.getAll);
    const isAdded = useTypedSelector((state) => state.users.isLoading.add);
    const del = useTypedSelector((state) => state.users.isLoading.delete);
    const edit = useTypedSelector((state) => state.users.isLoading.edit);
    const search = useTypedSelector((state) => state.users.isLoading.search);

    const [users, setUsers] = React.useState<IUser[]>([]);
    const [searchParam, setSearchParam] = useState<string>('');

    useEffect(() => {
        dispatch({ type: usersActions.GET_USERS_REQUEST });
        dispatch({ type: universitiesActions.GET_UNIVERSITIES_REQUEST });
        dispatch({ type: technologiesActions.GET_TECHNOLOGIES_REQUEST });
        dispatch({ type: companiesActions.GET_COMPANIES_REQUEST });
    }, [dispatch]);

    useEffect(() => {
        setUsers(allUsers)
    }, [load, isAdded, del, edit, search]);

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
        <>
            {!load ? (
                <CustomBox>
                    <UserModal open={open} handleClose={handleClose} />
                    <Box className='pageTitleContainer'>
                        <Typography className='pageTitle pageName'>Users </Typography>
                        <Typography className='pageTitle pageNameCount'>({users.length})</Typography>
                    </Box>
                    <Box className='searchContainer'>
                        <Input setParam={setSearchParam} placeholder={"Search user"} />
                        <Box className='addButtonContainer'>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add User' />
                        </Box>
                    </Box>
                    {users.length === 0 ? (
                        <NoResult />
                    ) : (
                        <Box className='techContainer techContainerMain'>
                            <ThemeProvider theme={lightTheme}>
                                {users.map((user, i) => (
                                    <UserCard user={user} handleOpen={handleOpen} key={i} />
                                ))}
                            </ThemeProvider>
                        </Box>
                    )}
                </CustomBox>
            ) : (
                <PreviewPageUser />
            )}
        </>
    )
}
export default UsersPage