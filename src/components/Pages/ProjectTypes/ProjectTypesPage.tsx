import React, { useEffect, useState } from 'react';
import Input from '../../Items/Input';
import CustomButton from '../../Items/CustomButton';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { Box, styled, Typography } from '@mui/material';
import PreviewPageTable from '../../Items/PreviewPages/PreviewPageTable';
import NoResult from '../../Items/Search/NoResult';
import { projectTypesActions } from '../../../actionsTypes/projectTypesActionTypes';
import ProjectTypesTable from './Items/ProjectTypesTable';
import AddModal from '../../Items/AddModal';
import { IProjectType } from '../../../interfaces';

const CustomBox = styled(Box)(() => ({
    paddingRight: '35px',
    paddingLeft: '250px',
    ['@media (max-width:768px)']: {
        paddingLeft: '35px',
    }
}))

const EducationPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const AllProjectTypes = useTypedSelector((state) => state.projectTypes.projectTypes);
    const load = useTypedSelector((state) => state.projectTypes.isLoading.getAll);
    const isAdded = useTypedSelector((state) => state.projectTypes.isLoading.add);
    const del = useTypedSelector((state) => state.projectTypes.isLoading.delete);
    const edit = useTypedSelector((state) => state.projectTypes.isLoading.edit);
    const search = useTypedSelector((state) => state.projectTypes.isLoading.search);

    const [searchParam, setSearchParam] = useState<string>('');
    const [projectTypes, setProjectTypes] = useState<IProjectType[]>([]);

    useEffect(() => {
        dispatch({ type: projectTypesActions.GET_PROJECTTYPES_REQUEST });
    }, [dispatch]);

    useEffect(() => {
        setProjectTypes(AllProjectTypes)
    }, [load, isAdded, del, edit, search]);

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

    return (
        <>
            {!load ? (
                <CustomBox>
                    <AddModal open={open} handleClose={handleClose} action={projectTypesActions.ADD_PROJECTTYPE_REQUEST} addName={'Project type'} />
                    <Box sx={{ m: 0, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Project type </Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#D0D4DA', mt: '35px', mb: '30px', ml: '5px' }}>({projectTypes.length})</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Input setParam={setSearchParam} placeholder={"Search project type"} />
                        <Box sx={{ marginLeft: 'auto', mb: '20px' }}>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add Project type' />
                        </Box>
                    </Box>
                    {projectTypes.length === 0 ? (
                        <NoResult />
                    ) : (
                        <ProjectTypesTable projectTypes={projectTypes} />
                    )}
                </CustomBox>
            ) : (
                <PreviewPageTable />
            )}
        </>
    )
}
export default EducationPage