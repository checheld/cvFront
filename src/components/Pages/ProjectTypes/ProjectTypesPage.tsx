import React, { useEffect, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { projectTypesActions } from '../../../actionsTypes/projectTypesActionTypes';
import PreviewPageTable from '../../Items/PreviewPages/PreviewPageTable';
import NoResult from '../../Items/Search/NoResult';
import Input from '../../Items/Input';
import CustomButton from '../../Items/CustomButton';
import ProjectTypesTable from './Items/ProjectTypesTable';
import AddModal from '../../Items/AddModal';
import { IProjectType } from '../../../interfaces';
import '../../Components.css';

const CustomBox = styled(Box)(() => ({
    paddingRight: '35px',
    paddingLeft: '250px',
    marginBottom: '30px',
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
                    <Box className='pageTitleContainer'>
                        <Typography className='pageTitle pageName'>Project type </Typography>
                        <Typography className='pageTitle pageNameCount'>({projectTypes.length})</Typography>
                    </Box>
                    <Box className='searchContainer'>
                        <Input setParam={setSearchParam} placeholder={"Search project type"} />
                        <Box className='addButtonContainer'>
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