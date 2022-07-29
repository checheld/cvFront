import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Box, createTheme, ThemeProvider } from '@mui/material';
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



const CVsPage: React.FC = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();
    const [searchParam, setSearchParam] = React.useState<string>('');
    const CVs = useTypedSelector((state) => state.CVs.CVs);
    const result = useTypedSelector((state) => state.CVs.result);
    const load = useTypedSelector((state) => state.CVs.isLoading.getAll);
    const search = useTypedSelector((state) => state.CVs.isLoading.search);
    useEffect(() => {
        dispatch({ type: CVsActions.GET_CVS_REQUEST });
        dispatch({ type: usersActions.GET_USERS_REQUEST });
        dispatch({ type: projectsActions.GET_PROJECTS_REQUEST });
    }, [result, dispatch]);

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
                <Box sx={{ pl: '250px', pr: '35px' }}>
                    <CVModal open={open} handleClose={handleClose} />
                    <Box sx={{ m: 0, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>CVs </Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#D0D4DA', mt: '35px', mb: '30px', ml: '5px' }}>({CVs.length})</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Input setParam={setSearchParam} placeholder={"Search CV"} />
                        <Box sx={{ marginLeft: 'auto' }}>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add CV' />
                        </Box>
                    </Box>
                    {CVs.length === 0 ? (
                        <NoResult />
                    ) : (
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
                    )}
                </Box>
            ) : (
                <PreviewPageCv />
            )}
        </>
    )
}
export default CVsPage