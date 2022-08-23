import React, { useEffect } from 'react';
import Input from '../../Items/Input';
import CustomButton from '../../Items/CustomButton';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { Box, Typography } from '@mui/material';
import PreviewPageTable from '../../Items/PreviewPages/PreviewPageTable';
import NoResult from '../../Items/Search/NoResult';
import { projectTypesActions } from '../../../actionsTypes/projectTypesActionTypes';
import ProjectTypesTable from './Items/ProjectTypesTable';
import AddModal from '../../Items/AddModal';

const EducationPage: React.FC = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();
    const [searchParam, setSearchParam] = React.useState<string>('');
    const projectTypes = useTypedSelector((state) => state.projectTypes.projectTypes);
    const load = useTypedSelector((state) => state.projectTypes.isLoading.getAll);
    const result = useTypedSelector((state) => state.projectTypes.result);

    useEffect(() => {
        dispatch({ type: projectTypesActions.GET_PROJECTTYPES_REQUEST });
    }, [result, dispatch]);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                if (searchParam === '') {
                    dispatch({ type: projectTypesActions.GET_PROJECTTYPES_REQUEST });
                } else {
                    dispatch({ type: projectTypesActions.SEARCH_PROJECTTYPES_REQUEST, payload: searchParam });
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [searchParam]);

    const screenWidth = window.screen.width;
    const [inputWidth, setInputWidth] = React.useState<number>();
    React.useEffect(() => {
        if (screenWidth <= 1024) setInputWidth(500)
        else setInputWidth(700)
    }, [screenWidth]);

    return (
        <>
            {!load ? (
                <Box sx={{ pl: '250px', pr: '35px' }}>
                    <AddModal open={open} handleClose={handleClose} action={projectTypesActions.ADD_PROJECTTYPE_REQUEST} addName={'Project type'} />
                    <Box sx={{ m: 0, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Project type </Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#D0D4DA', mt: '35px', mb: '30px', ml: '5px' }}>({projectTypes.length})</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Input setParam={setSearchParam} placeholder={"Search project type"} width={300} />
                        <Box sx={{ marginLeft: 'auto' }}>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add Project type' />
                        </Box>
                    </Box>
                    {projectTypes.length === 0 ? (
                        <NoResult />
                    ) : (
                        <ProjectTypesTable />
                    )}
                </Box>
            ) : (
                <PreviewPageTable />
            )}
        </>
    )
}
export default EducationPage