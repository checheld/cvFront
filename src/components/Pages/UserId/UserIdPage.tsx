import { Box, Button, Chip, CircularProgress, createTheme, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, styled, ThemeProvider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { companiesActions } from '../../../actionsTypes/companiesActionTypes';
import { technologiesActions } from '../../../actionsTypes/technologiesActionTypes';
import { universitiesActions } from '../../../actionsTypes/universitiesActionTypes';
import { usersActions } from '../../../actionsTypes/usersActionTypes';
import UserModal from '../Users/Modal/UserModal';
import { IEducation, IProject, ITechnology, IUser, IWorkExperience } from '../../../interfaces';
import { useTypedSelector } from '../../../redusers/useTypedSelector';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    padding: '25px'
}));
const lightTheme = createTheme({ palette: { mode: 'light' } });

const UserIdPage: React.FC = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const router = useNavigate();
    const currentPath = location.pathname;
    const userId = Number(
        currentPath.substring(currentPath.lastIndexOf('/') + 1)
    );
    const edit = useTypedSelector((state) => state.users.isLoading.edit)

    useEffect(() => {
        const getUser = (async () => {
            await dispatch({ type: usersActions.GET_USER_REQUEST, id: userId });
            await dispatch({ type: universitiesActions.GET_UNIVERSITIES_REQUEST });
            await dispatch({ type: technologiesActions.GET_TECHNOLOGIES_REQUEST });
            await dispatch({ type: companiesActions.GET_COMPANIES_REQUEST });
        })
        getUser()
    }, [dispatch, userId, edit]);

    const currentUser: IUser | undefined = useTypedSelector((state) => state.users.user);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const delUser = () => {
        dispatch({ type: usersActions.DEL_USER_REQUEST, payload: userId });
        router(`/users`)
    }

    return (
        <Box sx={{ pl: '250px', pr: '35px', pt: '35px' }}>
            {currentUser === undefined ? (
                <>
                    <CircularProgress></CircularProgress>
                </>
            ) : (
                <>
                    <UserModal open={open} handleClose={handleClose} editableUser={currentUser}/>
                    <ThemeProvider theme={lightTheme}>
                        <Stack spacing={2}>
                            <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                                <Box sx={{ display: "flex", width: '280px' }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto' }}>
                                        PROFILE
                                    </Typography>
                                    <Divider orientation="vertical" sx={{ height: '100%' }} />
                                </Box>
                                <Box>
                                    <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '23px', color: '#535E6C', mt: '35px', ml: '40px', mb: '15px' }}>
                                        {currentUser.firstName} {currentUser.lastName}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: '#AFB5BF', mb: '37px', ml: '40px' }}>
                                        {currentUser.description}
                                    </Typography>
                                </Box>
                            </Item>
                            <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                                <Box sx={{ display: "flex", width: '280px' }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto' }}>
                                        EDUCATION
                                    </Typography>
                                    <Divider orientation="vertical" sx={{ height: '100%' }} />
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    {
                                        currentUser.educationList.map((education: IEducation) => (
                                            <Box sx={{ mt: '35px', mb: '35px', ml: '40px', mr: '100px' }}>
                                                <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '20px' }}>
                                                    {education.speciality}
                                                </Typography>
                                                <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '21.7px', color: '#AFB5BF', mb: '15px' }}>
                                                    {education!.university!.name}
                                                </Typography>
                                                <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '21.7px', color: '#AFB5BF' }}>
                                                    {education.startDate} - {education.endDate}
                                                </Typography>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </Item>
                            <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                                <Box sx={{ display: "flex", width: '280px' }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto' }}>
                                        WORK EXPERIENCE
                                    </Typography>
                                    <Divider orientation="vertical" sx={{ height: '100%' }} />
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    {
                                        currentUser.workExperienceList.map((workExperience: IWorkExperience) => (
                                            <Box sx={{ mt: '35px', mb: '35px', ml: '40px', mr: '100px' }}>
                                                <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '30px' }}>
                                                    {workExperience.startDate} - {workExperience.endDate} | {workExperience.company.name}
                                                </Typography>
                                                <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '20px' }}>
                                                    {workExperience.position}
                                                </Typography>
                                                <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '21.7px', color: '#AFB5BF' }}>
                                                    {workExperience.description}
                                                </Typography>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </Item>
                            <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                                <Box sx={{ display: "flex", width: '280px' }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto' }}>
                                        TECHNOLOGIES
                                    </Typography>
                                    <Divider orientation="vertical" sx={{ height: '100%' }} />
                                </Box>
                                <Box sx={{ mt: '35px', ml: '40px', mb: '35px' }}>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <Box sx={{width: '300px', minHeight: '100px'}}>
                                            <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '15px' }}>
                                                Front-end
                                            </Typography>
                                            <Box>
                                                {
                                                    currentUser.technologyList.filter((tech) => tech.type === 'front-end').map((tech: ITechnology) => (
                                                        <Chip label={tech.name} sx={{ mr: '10px' }} />
                                                    ))
                                                }
                                            </Box>
                                        </Box>
                                        <Box  sx={{width: '300px', minHeight: '100px'}}>
                                            <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '15px' }}>
                                                Databases
                                            </Typography>
                                            <Box>
                                                {
                                                    currentUser.technologyList.filter((tech) => tech.type === 'databases').map((tech: ITechnology) => (
                                                        <Chip label={tech.name} sx={{ mr: '10px' }} />
                                                    ))
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <Box sx={{width: '300px', minHeight: '100px'}}>
                                            <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '15px' }}>
                                                Back-end
                                            </Typography>
                                            <Box>
                                                {
                                                    currentUser.technologyList.filter((tech) => tech.type === 'back-end').map((tech: ITechnology) => (
                                                        <Chip label={tech.name} sx={{ mr: '10px' }} />
                                                    ))
                                                }
                                            </Box>
                                        </Box>
                                        <Box sx={{width: '300px', minHeight: '100px'}}>
                                            <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '15px' }}>
                                                Hosting
                                            </Typography>
                                            <Box>
                                                {
                                                    currentUser.technologyList.filter((tech) => tech.type === 'hosting').map((tech: ITechnology) => (
                                                        <Chip label={tech.name} sx={{ mr: '10px' }} />
                                                    ))
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{width: '300px', minHeight: '100px'}}>
                                        <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '15px' }}>
                                            Other
                                        </Typography>
                                        <Box>
                                            {
                                                currentUser.technologyList.filter((tech) => tech.type === 'other').map((tech: ITechnology) => (
                                                    <Chip label={tech.name} sx={{ mr: '10px' }} />
                                                ))
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </Item>
                            <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                                <Box sx={{ display: "flex", width: '280px' }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto' }}>
                                        SOFT SKILLS
                                    </Typography>
                                    <Divider orientation="vertical" sx={{ height: '100%' }} />
                                </Box>
                                <Box  sx={{ mt: '35px', ml: '40px', mb: '35px' }}>
                                    <List>
                                        {
                                            currentUser.technologyList.filter((tech) => tech.type === 'soft skills').map((tech: ITechnology) => (
                                                <ListItem>
                                                    <ListItemIcon></ListItemIcon>
                                                    <ListItemText  primary={tech.name} />
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Box>
                            </Item>
                            <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                                <Box sx={{ display: "flex", width: '280px' }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto' }}>
                                        CV
                                    </Typography>
                                    <Divider orientation="vertical" sx={{ height: '100%' }} />
                                </Box>
                                <Box>
                                    <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '23px', color: '#535E6C', mt: '35px', ml: '40px', mb: '35px' }}>
                                        ADD!!
                                    </Typography>
                                </Box>
                            </Item>
                        </Stack>
                    </ThemeProvider>
                    <Box sx={{ ml: '307px', mt: '35px' }}>
                        <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#ECF2FC', color: '#5893F9', mr: '10px' }} >Edit</Button>
                        <Button variant="contained" onClick={delUser} sx={{ backgroundColor: '#F1F3F5', color: '#BAC1CC' }} >Delete</Button>
                    </Box>
                </>
            )}
        </Box>
    )
}
export default UserIdPage