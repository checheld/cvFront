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
import { IProject } from '../../../interfaces';

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

    const screenWidth = window.screen.width;
    const [inputSearchWidth, setInputSearchWidth] = useState<number>();
    const [winWidthPadding, setWinWidthPadding] = useState<string>();
    const [winWidthType, setWinWidthType] = useState<number>();
    const [winPaddingType, setWinPaddingType] = useState<string>();
    const [winWidthTech, setWinWidthTech] = useState<number>();

    useEffect(() => {
        if (screenWidth <= 1024 && screenWidth > 768) {
            setWinWidthPadding('250px')
            setWinPaddingType('15px')
        } else if (screenWidth < 769 && screenWidth > 425) {
            setWinWidthPadding('35px')
            setWinWidthType(140)
            setWinWidthTech(140)
            setWinPaddingType('15px')
        } else if (screenWidth < 426) {
            setWinWidthPadding('35px')
            setInputSearchWidth(200)
            setWinWidthType(140)
            setWinWidthTech(175)
            setWinPaddingType('0px')
        } else {
            setWinWidthPadding('250px')
            setWinWidthType(160)
            setWinWidthTech(190)
            setInputSearchWidth(300)
            setWinPaddingType('15px')
        }
    }, [screenWidth]);

    return (
        <>
            {!load ? (
                <Box sx={{ pl: winWidthPadding, pr: '35px' }}>
                    <ProjectModal open={open} handleClose={handleClose} />
                    <Box sx={{ m: 0, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Projects </Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#D0D4DA', mt: '35px', mb: '30px', ml: '5px' }}>({projects.length})</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Input setParam={setSearchName} placeholder={"Search project"} width={inputSearchWidth!} />
                        <ProjectsTypeSelect setParam={setSearchType} width={winWidthType!} mr={winPaddingType!} />
                        <ProjectsTechSelect setParam={setSearchTech} width={winWidthTech!} />
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