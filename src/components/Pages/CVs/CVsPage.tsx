import React, { useEffect, useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { CVsActions } from '../../../actionsTypes/CVsActionTypes';
import { usersActions } from '../../../actionsTypes/usersActionTypes';
import { projectsActions } from '../../../actionsTypes/projectsActionTypes';
import CustomButton from '../../Items/CustomButton';
import Input from '../../Items/Input';
import CVModal from './Modal/CVModal';
import CVItem from './Items/CVItem';
import PreviewPageCv from '../../Items/PreviewPages/PreviewPageCv';
import NoResult from '../../Items/Search/NoResult';
import { ICV } from '../../../interfaces';
import '../../Components.css';

const CustomBox = styled(Box)(() => ({
    paddingRight: '35px',
    paddingLeft: '250px',
    ['@media (max-width:768px)']: {
        paddingLeft: '35px',
    }
}))

const CVsPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const AllCVs = useTypedSelector((state) => state.CVs.CVs);
    const load = useTypedSelector((state) => state.CVs.isLoading.getAll);
    const search = useTypedSelector((state) => state.CVs.isLoading.search);
    const isAdded = useTypedSelector((state) => state.CVs.isLoading.add);
    const del = useTypedSelector((state) => state.CVs.isLoading.delete);
    const edit = useTypedSelector((state) => state.CVs.isLoading.edit);

    const [searchParam, setSearchParam] = useState<string>('');
    const [CVs, setCVs] = React.useState<ICV[]>([]);
    const [resentCVs, setResentCVs] = React.useState<ICV[]>([]);
    useEffect(() => {
        dispatch({ type: CVsActions.GET_CVS_REQUEST });
        dispatch({ type: usersActions.GET_USERS_REQUEST });
        dispatch({ type: projectsActions.GET_PROJECTS_REQUEST });
    }, [dispatch]);

    useEffect(() => {
        setCVs(AllCVs)
        setResentCVs(AllCVs.slice(0, 4))
    }, [load, isAdded, del, edit, search]);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                if (searchParam === '') {
                    dispatch({ type: CVsActions.GET_CVS_REQUEST });
                } else {
                    dispatch({ type: CVsActions.SEARCH_CVS_REQUEST, payload: searchParam });
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
                    <CVModal open={open} handleClose={handleClose} />
                    <Box className='pageTitleContainer'>
                        <Typography className='pageTitle pageName'>CVs </Typography>
                        <Typography className='pageTitle pageNameCount'>({CVs.length})</Typography>
                    </Box>
                    <Box className='searchContainer'>
                        <Input setParam={setSearchParam} placeholder={"Search CV"} />
                        <Box className='addButtonContainer'>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add CV' />
                        </Box>
                    </Box>
                    {CVs.length === 0 ? (
                        <NoResult />
                    ) : (
                        <>
                            <Box>
                                <Typography className='cvList resentCvList'>
                                    Recent CVs
                                </Typography>
                                <Box className='techContainer techContainerMain'>
                                    {resentCVs.map((CV, i) => (
                                        <CVItem CV={CV} key={i} />
                                    ))}
                                </Box>
                            </Box>
                            <Box>
                                <Typography className='cvList allCvList'>
                                    All CVs
                                </Typography>
                                <Box className='techContainer techContainerMain'>
                                    {CVs.map((CV, i) => (
                                        <CVItem CV={CV} key={i} />
                                    ))}
                                </Box>
                            </Box>
                        </>
                    )}
                </CustomBox>
            ) : (
                <PreviewPageCv />
            )}
        </>
    )
}
export default CVsPage