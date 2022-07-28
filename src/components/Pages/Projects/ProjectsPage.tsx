import React, { useEffect, useState } from 'react';
import Input from '../../Items/Input';
import CustomButton from '../../Items/CustomButton';
import { Box, Typography } from '@mui/material';
import ProjectsTable from './Items/ProjectsTable';
import ProjectsTypeSelect from './Items/ProjectsTypeSelect';
import ProjectsTechSelect from './Items/ProjectsTechSelect';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import ProjectModal from './Modal/ProjectModal';
import { projectsActions } from '../../../actionsTypes/projectsActionTypes';
import PreviewPageTable from '../../Items/PreviewPages/PreviewPageTable';
import NoResult from '../../Items/Search/NoResult';
import { technologiesActions } from '../../../actionsTypes/technologiesActionTypes';
import { projectTypesActions } from '../../../actionsTypes/projectTypesActionTypes';

const ProjectsPage: React.FC = () => {

    let projects = useTypedSelector((state) => state.projects.projects);
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchName, setSearchName] = React.useState('');
    const [searchType, setSearchType] = React.useState('');
    const [searchTech, setSearchTech] = React.useState('');
    const load = useTypedSelector((state) => state.projects.isLoading.getAll);
    const result = useTypedSelector((state) => state.projects.result);

    useEffect(() => {
        dispatch({ type: technologiesActions.GET_TECHNOLOGIES_REQUEST });
        dispatch({ type: projectTypesActions.GET_PROJECTTYPES_REQUEST });
    }, [dispatch]);

    useEffect(() => {
        dispatch({ type: projectsActions.GET_PROJECTS_REQUEST });
    }, [result, dispatch]);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                if (searchName === '' && searchType === '' && searchTech === '') {
                    dispatch({ type: projectsActions.GET_PROJECTS_REQUEST });
                } else if (searchType === '' && (searchTech !== '' || searchName !== '')) {
                    dispatch({ type: projectsActions.SEARCH_PROJECTS_REQUEST, payload: { name: searchName, technologyName: searchTech } });
                } else {
                    dispatch({ type: projectsActions.SEARCH_PROJECTS_REQUEST, payload: { name: searchName, type: searchType, technologyName: searchTech } });
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [searchName, searchType, searchTech]);

    return (
        <>
            {!load ? (
                <Box sx={{ pl: '250px', pr: '35px' }}>
                    <ProjectModal open={open} handleClose={handleClose} />
                    <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Projects ({projects.length})</Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Input setParam={setSearchName} placeholder={"Search project"} />
                        <ProjectsTypeSelect setParam={setSearchType} />
                        <ProjectsTechSelect setParam={setSearchTech} />
                        <Box sx={{ marginLeft: 'auto' }}>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add Project' />
                        </Box>
                    </Box>
                    {projects.length === 0 ? (
                        <NoResult />
                    ) : (
                        <ProjectsTable projects={projects} />
                    )}
                </Box>
            ) : (
                <PreviewPageTable />
            )}
        </>
    )
}
export default ProjectsPage