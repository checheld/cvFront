import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import CustomButton from '../../Items/CustomButton';
import Input from '../../Items/Input';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import CVModal from './Modal/CVModal';
import { CVsActions } from '../../../actionsTypes/CVsActionTypes';
import { usersActions } from '../../../actionsTypes/usersActionTypes';
import { projectsActions } from '../../../actionsTypes/projectsActionTypes';
import CVItem from './Items/CVItem';
import PreviewPageCv from '../../Items/PreviewPages/PreviewPageCv';
import NoResult from '../../Items/Search/NoResult';
import { ICV } from '../../../interfaces';

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

    const screenWidth = window.screen.width;
    const [winWidthPadding, setWinWidthPadding] = useState<string>();

    useEffect(() => {
        if (screenWidth < 769) {
            setWinWidthPadding('35px')
        }
        else {
            setWinWidthPadding('250px')
        }
    }, [screenWidth]);

    return (
        <>
            {!load ? (
                <Box sx={{ pl: winWidthPadding, pr: '35px' }}>
                    <CVModal open={open} handleClose={handleClose} />
                    <Box sx={{ m: 0, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>CVs </Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#D0D4DA', mt: '35px', mb: '30px', ml: '5px' }}>({CVs.length})</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Input setParam={setSearchParam} placeholder={"Search CV"} width={300} />
                        <Box sx={{ marginLeft: 'auto' }}>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add CV' />
                        </Box>
                    </Box>
                    {CVs.length === 0 ? (
                        <NoResult />
                    ) : (
                        <>
                            <Box>
                                <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '20px', mt: '10px' }}>
                                    Recent CVs
                                </Typography>
                                <Box sx={{
                                    p: 2,
                                    bgcolor: '#FBFBFB',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gridTemplateColumns: { md: '1fr 1fr' },
                                    gap: 2,
                                    padding: '0px'
                                }}>
                                    {resentCVs.map((CV) => (
                                        <CVItem CV={CV} />
                                    ))}
                                </Box>
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '20px', mt: '35px' }}>
                                    All CVs
                                </Typography>
                                <Box sx={{
                                    p: 2,
                                    bgcolor: '#FBFBFB',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gridTemplateColumns: { md: '1fr 1fr' },
                                    gap: 2,
                                    padding: '0px'
                                }}>
                                    {CVs.map((CV) => (
                                        <CVItem CV={CV} />
                                    ))}
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            ) : (
                <PreviewPageCv />
            )}
        </>
    )
}
export default CVsPage