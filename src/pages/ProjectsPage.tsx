import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import { Box, Typography } from '@mui/material';
import ProjectsTable from '../components/ProjectsTable';
import ProjectsTypeSelect from '../components/ProjectsTypeSelect';
import ProjectsTechSelect from '../components/ProjectsTechSelect';
import { useAppDispatch, useTypedSelector } from '../redusers/useTypedSelector';
import ProjectModal from '../components/ProjectModal';
import { projectsActions } from '../actionsTypes/projectsActionTypes';

const ProjectsPage: React.FC = () => {

    let projects = useTypedSelector((state) => state.projects.projects);
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchName, setSearchName] = React.useState<string>('');
    const [searchType, setSearchType] = React.useState<string>('');
    const [searchTech, setSearchTech] = React.useState<string>('');

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                if (searchName === '' && searchType === '' && searchTech === '' ) {
                    dispatch({ type: projectsActions.GET_PROJECTS_REQUEST });
                } else {
                    dispatch({ type: projectsActions.SEARCH_PROJECTS_REQUEST, payload: {name: searchName, type: searchType, technologyName: searchTech} });
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [searchName, searchType, searchTech]);

    return (
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
            <ProjectsTable projects={projects}/>
        </Box>
    )
}
export default ProjectsPage