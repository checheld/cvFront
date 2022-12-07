import React, { useEffect } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { projectsActions } from '../../../actionsTypes/projectsActionTypes';
import { technologiesActions } from '../../../actionsTypes/technologiesActionTypes';
import { projectTypesActions } from '../../../actionsTypes/projectTypesActionTypes';
import ProjectsSearchInput from '../Projects/Items/ProjectsSearchInput';
import CustomButtonFixed from '../../Items/CustomButtonFixed';
import ProjectsTable from './Items/ProjectsTable';
import ProjectsTypeSelect from './Items/ProjectsTypeSelect';
import ProjectsTechSelect from './Items/ProjectsTechSelect';
import ProjectModal from './Modal/ProjectModal';
import PreviewPageTable from '../../Items/PreviewPages/PreviewPageTable';
import NoResult from '../../Items/Search/NoResult';
import { IProject } from '../../../interfaces';
import '../../Components.css';

const CustomBox = styled(Box)(() => ({
    paddingRight: '35px',
    paddingLeft: '250px',
    ['@media (max-width:769px)']: {
        paddingLeft: '35px',
    }
}))

const ProjectsPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let AllProjects = useTypedSelector((state) => state.projects.projects);
    const load = useTypedSelector((state) => state.projects.isLoading.getAll);
    const isAdded = useTypedSelector((state) => state.projects.isLoading.add);
    const del = useTypedSelector((state) => state.projects.isLoading.delete);
    const edit = useTypedSelector((state) => state.projects.isLoading.edit);
    const search = useTypedSelector((state) => state.projects.isLoading.search);

    const [searchName, setSearchName] = React.useState('');
    const [searchType, setSearchType] = React.useState('');
    const [searchTech, setSearchTech] = React.useState('');
    const [projects, setProjects] = React.useState<IProject[]>([]);

    useEffect(() => {
        dispatch({ type: projectsActions.GET_PROJECTS_REQUEST });
        dispatch({ type: technologiesActions.GET_TECHNOLOGIES_REQUEST });
        dispatch({ type: projectTypesActions.GET_PROJECTTYPES_REQUEST });
    }, [dispatch]);

    useEffect(() => {
        setProjects(AllProjects)
    }, [load, isAdded, del, edit, search]);

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
                <CustomBox>
                    <ProjectModal open={open} handleClose={handleClose} />
                    <Box className='pageTitleContainer'>
                        <Typography className='pageTitle pageName'>Projects </Typography>
                        <Typography className='pageTitle pageNameCount'>({projects.length})</Typography>
                    </Box>
                    <Box className='searchContainer'>
                        <ProjectsSearchInput setParam={setSearchName} placeholder={"Search project"} />
                        <ProjectsTypeSelect setParam={setSearchType} />
                        <ProjectsTechSelect setParam={setSearchTech} />
                        <Box className='addButtonContainer'>
                            <CustomButtonFixed variant="contained" onClick={(handleOpen)} children='+ Add Project' />
                        </Box>
                    </Box>
                    {projects.length === 0 ? (
                        <NoResult />
                    ) : (
                        <ProjectsTable projects={projects} />
                    )}
                </CustomBox>
            ) : (
                <PreviewPageTable />
            )}
        </>
    )
}
export default ProjectsPage