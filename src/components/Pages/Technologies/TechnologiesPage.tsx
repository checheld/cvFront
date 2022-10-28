import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, createTheme, Divider, styled, ThemeProvider } from '@mui/material';
import Input from '../../Items/Input';
import CustomButton from '../../Items/CustomButton';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { technologiesActions } from '../../../actionsTypes/technologiesActionTypes';
import TechModal from './Modal/TechModal';
import PreviewPageTable from '../../Items/PreviewPages/PreviewPageTable';
import NoResult from '../../Items/Search/NoResult';
import { ITechnology } from '../../../interfaces';
import TechContainer from './Items/TechContainer';
import '../../Components.css';

const CustomBox = styled(Box)(() => ({
    paddingRight: '35px',
    paddingLeft: '250px',
    ['@media (max-width:768px)']: {
        paddingLeft: '35px',
    }
}))

const lightTheme = createTheme({ palette: { mode: 'light' } });

const TechnologiesPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let AllTechnologies = useTypedSelector((state) => state.technologies.technologies);
    const load = useTypedSelector((state) => state.technologies.isLoading.getAll);
    const isAdded = useTypedSelector((state) => state.technologies.isLoading.add);
    const del = useTypedSelector((state) => state.technologies.isLoading.delete);
    const edit = useTypedSelector((state) => state.technologies.isLoading.edit);
    const search = useTypedSelector((state) => state.technologies.isLoading.search);

    const [technologies, setTechnologies] = useState<ITechnology[]>([]);
    const [editableTech, setEditableTech] = useState<ITechnology>();
    const [searchParam, setSearchParam] = useState<string>('');

    useEffect(() => {
        dispatch({ type: technologiesActions.GET_TECHNOLOGIES_REQUEST });
    }, [dispatch]);

    useEffect(() => {
        setTechnologies(AllTechnologies)
    }, [load, isAdded, del, edit, search]);

    const handleEdit = (tech: ITechnology) => {
        setEditableTech(tech);
        handleOpen();
    };

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                if (searchParam === '') {
                    dispatch({ type: technologiesActions.GET_TECHNOLOGIES_REQUEST });
                } else {
                    dispatch({ type: technologiesActions.SEARCH_TECHNOLOGIES_REQUEST, payload: searchParam });
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [searchParam]);

    let frontEndTech = technologies.filter((tech) => tech.type === 'front-end');
    let backEndTech = technologies.filter((tech) => tech.type === 'back-end');
    let databasesTech = technologies.filter((tech) => tech.type === 'databases');
    let hostingTech = technologies.filter((tech) => tech.type === 'hosting');
    let otherTech = technologies.filter((tech) => tech.type === 'other');
    let softSkillsTech = technologies.filter((tech) => tech.type === 'soft skills');
    let allLength = frontEndTech.length + backEndTech.length + databasesTech.length + hostingTech.length + otherTech.length + softSkillsTech.length;

    const containers = [
        { name: 'Front-end', techCollection: frontEndTech },
        { name: 'Back-end', techCollection: backEndTech },
        { name: 'Databases', techCollection: databasesTech },
        { name: 'Hosting', techCollection: hostingTech },
        { name: 'Other', techCollection: otherTech }
    ]

    return (
        <>
            {!load ? (
                <CustomBox>
                    <TechModal open={open} handleClose={handleClose} editableTech={editableTech} />
                    <Box className='pageTitleContainer'>
                        <Typography className='pageTitle pageName'>Technologies </Typography>
                        <Typography className='pageTitle pageNameCount'> ({allLength})</Typography>
                    </Box>
                    <Box className='searchContainer'>
                        <Input setParam={setSearchParam} placeholder={"Search technology"} />
                        <Box className='addButtonContainer'>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add Technology' />
                        </Box>
                    </Box>
                    {technologies.length === 0 ? (
                        <NoResult />
                    ) : (
                        <Box>
                            <ThemeProvider theme={lightTheme}>
                                <Box className='techContainer techContainerMain'>
                                    {
                                        containers.map((x, i) => <TechContainer techCollection={x.techCollection} handleEdit={handleEdit} name={x.name} width={'260px'} />)
                                    }
                                </Box>
                                <Divider variant="inset" sx={{ mt: '35px', ml: '0px', mr: '15px', mb: '35px' }} />
                                <Box className='techContainer'>
                                    <TechContainer techCollection={softSkillsTech} handleEdit={handleEdit} name='Soft skills' width={'640px'} />
                                </Box>
                            </ThemeProvider>
                        </Box>
                    )}
                </CustomBox>
            ) : (
                <PreviewPageTable />
            )}
        </>
    )
}
export default TechnologiesPage